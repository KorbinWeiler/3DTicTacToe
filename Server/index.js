const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { InitializeBlankBoard, CheckWin } = require('./utils/GameUtils');

// Local config first, then shared ../.env. dotenv does not override vars that
// are already set, so real environment variables (e.g. on Azure) win.
require('dotenv').config();
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(express.json());
app.use(cors());

// --- Azure SQL Database -------------------------------------------------------
// Auth is always Microsoft Entra passwordless: the App Service managed identity
// in the cloud, `az login` credentials locally (via DefaultAzureCredential).
// Everything else (server, database) is parsed out of the ADO.NET connection
// string in AZURE_SQL_CONNECTIONSTRING - nothing else needs to be configured.
// We parse it ourselves because mssql's own string parser doesn't understand
// `Server=tcp:...`, `Initial Catalog`, or `Authentication=Active Directory ...`.
function parseConnString(cs) {
  const out = {};
  cs.split(';').forEach((pair) => {
    const i = pair.indexOf('=');
    if (i === -1) return;
    out[pair.slice(0, i).trim().toLowerCase()] = pair
      .slice(i + 1)
      .trim()
      .replace(/^"(.*)"$/, '$1');
  });
  return out;
}

function getConnString() {
  // A plain App Service *Application setting* comes through with its own name.
  // A *Connection string* setting is renamed SQLAZURECONNSTR_<name> /
  // SQLCONNSTR_<name> / CUSTOMCONNSTR_<name>, so fall back to scanning for those.
  const direct =
    process.env.AZURE_SQL_CONNECTIONSTRING ||
    process.env.DATABASE_URL ||
    process.env.SQLAZURECONNSTR_AZURE_SQL_CONNECTIONSTRING ||
    process.env.SQLCONNSTR_AZURE_SQL_CONNECTIONSTRING ||
    process.env.CUSTOMCONNSTR_AZURE_SQL_CONNECTIONSTRING;
  if (direct) return direct;

  const prefixed = Object.entries(process.env).find(
    ([k]) => k.startsWith('SQLAZURECONNSTR_') || k.startsWith('SQLCONNSTR_')
  );
  return prefixed && prefixed[1];
}

function buildDbConfig() {
  const cs = getConnString();
  if (!cs) {
    throw new Error(
      'No SQL connection string found (set AZURE_SQL_CONNECTIONSTRING as an App Service Application setting)'
    );
  }

  const p = parseConnString(cs);
  const serverRaw = p['server'] || p['data source'] || '';
  const [host, portFromServer] = serverRaw.replace(/^tcp:/i, '').split(',');

  // A user-assigned managed identity's client id may travel in the string as
  // `User Id=`; otherwise DefaultAzureCredential resolves the identity itself
  // (system-assigned MI, or AZURE_CLIENT_ID if you set one).
  const clientId = p['user id'] || p['uid'] || undefined;

  return {
    server: host,
    port: Number(portFromServer || 1433),
    database: p['initial catalog'] || p['database'],
    authentication: {
      type: 'azure-active-directory-default',
      options: clientId ? { clientId } : {},
    },
    options: {
      encrypt: (p['encrypt'] || 'true').toLowerCase() !== 'false',
      trustServerCertificate: (p['trustservercertificate'] || 'false').toLowerCase() === 'true',
    },
    // Generous timeouts: a serverless Azure SQL DB that has auto-paused can take
    // 30-60s to resume, and the first managed-identity token fetch adds latency.
    connectionTimeout: 60000,
    requestTimeout: 60000,
    pool: { max: 10, min: 0, idleTimeoutMillis: 30000 },
  };
}

const dbConfig = buildDbConfig();
console.log(
  `DB target: ${dbConfig.server || '(none)'}:${dbConfig.port}/${dbConfig.database || '(none)'} ` +
    `auth=${dbConfig.authentication ? dbConfig.authentication.type : 'sql'}`
);
const pool = new sql.ConnectionPool(dbConfig);
pool.on('error', (err) => console.error('Unexpected mssql pool error', err));

// Connect lazily, with retries, so a resuming serverless DB doesn't kill boot.
let poolConnect;
function connectDb() {
  if (!poolConnect) {
    poolConnect = (async () => {
      for (let attempt = 1; ; attempt++) {
        try {
          return await pool.connect();
        } catch (err) {
          if (attempt >= 6) throw err;
          console.log(
            `DB connect attempt ${attempt} failed (${err.code || err.message}); retrying in 5s`
          );
          await new Promise((r) => setTimeout(r, 5000));
        }
      }
    })();
  }
  return poolConnect;
}

// Thin callback-style wrappers so the handlers below stay close to their
// original shape. Queries use named params @p1, @p2, ... ; identifiers are
// bracket-quoted, the SQL Server idiom. SQL Server folds nothing, so the
// PascalCase column names come back exactly as declared.
async function runQuery(text, params = []) {
  await connectDb();
  const request = pool.request();
  params.forEach((val, i) => request.input(`p${i + 1}`, val));
  return request.query(text);
}
function dbGet(text, params, cb) {
  runQuery(text, params).then((r) => cb(null, r.recordset[0]), (e) => cb(e));
}
function dbAll(text, params, cb) {
  runQuery(text, params).then((r) => cb(null, r.recordset), (e) => cb(e));
}
function dbRun(text, params, cb) {
  runQuery(text, params).then(
    (r) => cb && cb(null, r),
    (e) => (cb ? cb(e) : console.log(e))
  );
}

async function initDb() {
  await connectDb();
  try {
    await pool.request().batch(`
    IF OBJECT_ID(N'dbo.Users', N'U') IS NULL
    CREATE TABLE dbo.Users (
      [Username]     NVARCHAR(100)  NOT NULL PRIMARY KEY,
      [PasswordHash] NVARCHAR(MAX)  NOT NULL,
      [Email]        NVARCHAR(255)
    );

    IF OBJECT_ID(N'dbo.Games', N'U') IS NULL
    CREATE TABLE dbo.Games (
      [GameID]      INT IDENTITY(1,1) PRIMARY KEY,
      [PlayerX]     NVARCHAR(100) NOT NULL,
      [PlayerO]     NVARCHAR(100) NOT NULL,
      [BoardState]  NVARCHAR(MAX) NOT NULL,
      [CurrentTurn] NVARCHAR(100),
      [Winner]      NVARCHAR(100)
    );

    IF OBJECT_ID(N'dbo.Invites', N'U') IS NULL
    CREATE TABLE dbo.Invites (
      [InviteID]  INT IDENTITY(1,1) PRIMARY KEY,
      [FromUser]  NVARCHAR(100) NOT NULL,
      [ToUser]    NVARCHAR(100) NOT NULL,
      [DateSent]  NVARCHAR(50)  NOT NULL,
      [Status]    NVARCHAR(20)  NOT NULL CONSTRAINT DF_Invites_Status DEFAULT 'pending'
    );
    `);
  } catch (err) {
    // If the tables already exist the IF guards make this a no-op, so a
    // permission error here means the identity lacks CREATE TABLE rights.
    // Grant db_ddladmin, or create the tables once from schema.sql as the
    // Entra admin and the app only needs db_datareader + db_datawriter.
    if (/permission|denied/i.test(err.message)) {
      console.error(
        'initDb: cannot create tables - grant db_ddladmin to the app identity, ' +
          'or run schema.sql manually. Continuing in case the tables already exist.'
      );
    } else {
      throw err;
    }
  }
}

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

const userConnections = {};

function initLobbyStack(count){
  const tempStack = []
  for(let i = 0; i < count; ++i){
    tempStack.push(i);
  }
  return tempStack;
}

const lobbyStack = initLobbyStack(10);
console.log(lobbyStack)

function getLobbyID(){
  return lobbyStack.pop();
}

app.get('/test', (req, res) => {
  res.send('Server is running');
});

app.post('/login', (req, res) => {
  dbGet(`SELECT [PasswordHash] FROM [Users] WHERE [Username] = @p1`, [req.body.username], (err, row) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row || row.PasswordHash !== req.body.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token: token, user: req.body.username });
  });
});

app.get('/guestLogin', (req, res) => {
  let guestUsername = `Guest${Math.floor(Math.random() * 1000000000)}`;
  while (guestUsername in userConnections){
    guestUsername = `Guest${Math.floor(Math.random() * 1000000000)}`;
  }
  const token = jwt.sign({ username: guestUsername }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token: token, user: guestUsername });
});

app.post('/register', (req, res) => {
  const { username, password, email } = req.body;
  console.log("Registering user: ", username, email);
  dbRun(
    `INSERT INTO [Users] ([Username], [PasswordHash], [Email]) VALUES (@p1, @p2, @p3)`,
    [username, password, email],
    (err) => {
      if (err) {
        console.log(err)
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully' });
    }
  );
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  const userID = socket.handshake.auth.clientID
  console.log(userID)

  userConnections[userID] = socket.id;
  console.log(userConnections);

  const activeUser = []
  for (let key in userConnections){
    if (userConnections.hasOwnProperty(key)) {
          activeUser.push(key)
      }
  }
  io.emit("active players", activeUser)

  //I think I can get rid of this because authentication is done using an http request
  socket.on("authenticate user", (userID) =>{
    const token = jwt.sign({
      userID: userID
    }, process.env.JWT_SECRET, { expiresIn: '1h' })
    //sessionStorage.setItem("sessionToken", token)
    io.to(userConnections[userID]).emit("Authenticated", token)
  })

  socket.on("get active users", (RequestUsersName, token, callback) =>{
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err);
        io.to(socket.id).emit("active players", { error: "Invalid token" });
        return;
      }
    });
    const keys = Object.keys(userConnections).filter(key => key !== RequestUsersName);
    callback(keys);
  })

  socket.on('sendPlay', (opponentID, senderID, play) => {
    //send the play back to the player again
    io.to(userConnections[senderID]).emit("replay play", play)
    socket.to(userConnections[opponentID]).emit("recieve play", {
      opponentPlay: play
    })
  })

  socket.on('get games', (username, callback) =>{
    dbAll(
      `SELECT [GameID], [PlayerX], [PlayerO], [BoardState], [CurrentTurn]
       FROM [Games]
       WHERE ([PlayerX] = @p1 OR [PlayerO] = @p1) AND [Winner] IS NULL`,
      [username],
      (err, rows) => {
        if (err) {
          console.log(err)
          callback({ error: 'Database error' });
          return;
        }

        callback(rows);
      }
    );
  })

  socket.on('get game', (gameID, callback) =>{
    dbGet(`SELECT * FROM [Games] WHERE [GameID] = @p1`, [gameID], (err, row) => {
      if (err) {
        console.log(err)
        callback({ error: 'Database error' });
        return;
      }
      console.log("game data: ", row)
      callback(row);
    });
  });

  socket.on('get board', (gameID, callback) =>{
    console.log("Fetching board for gameID: " + gameID)
    dbGet(`SELECT [BoardState] FROM [Games] WHERE [GameID] = @p1`, [gameID], (err, row) => {
      if (err) {
        console.log(err)
        callback({ error: 'Database error' });
        return;
      }
      console.log("Ongoing games: ", row)
      callback(row);
    });
  });


  socket.on('invite', (opponentID, senderID) => {
    const now = new Date().toISOString();
    dbRun(
      `INSERT INTO [Invites] ([FromUser], [ToUser], [DateSent], [Status]) VALUES (@p1, @p2, @p3, 'pending')`,
      [senderID, opponentID, now],
      (err) => {
        if (err) {
          console.log(err)
          return;
        }
      }
    );
    io.to(userConnections[opponentID]).emit("update", "invite received");
  })

  socket.on('get invites', (username, callback) =>{
    dbAll(
      `SELECT [FromUser], [DateSent] FROM [Invites] WHERE [ToUser] = @p1 AND [Status] = 'pending'`,
      [username],
      (err, rows) => {
        if (err) {
          console.log(err)
          callback({ error: 'Database error' });
          return;
        }
        callback(rows);
      }
    );
  })

  socket.on("request users", ()=>{
    socket.emit("active players", activeUser)
    // io.to(socket).emit("active players", activeUser)
  })

  socket.on('accept invitation', (opponentID, hostID, date) =>{
    const blankBoard = InitializeBlankBoard();
    dbRun(
      `UPDATE [Invites] SET [Status] = 'accepted'
       WHERE [FromUser] = @p1 AND [ToUser] = @p2 AND [DateSent] = @p3`,
      [hostID, opponentID, date],
      (err) => {
        if (err) {
          console.log(err)
          return;
        }
      }
    );

    dbRun(
      `INSERT INTO [Games] ([PlayerX], [PlayerO], [BoardState], [CurrentTurn])
       VALUES (@p1, @p2, @p3, @p4)`,
      [opponentID, hostID, JSON.stringify(blankBoard), opponentID],
      (err) => {
        if (err) {
          console.log(err)
          return;
        }
      }
    );
    io.to(userConnections[hostID]).emit("update", "Game Added")
    io.to(userConnections[opponentID]).emit("update", "Game Added")

  })

  socket.on("make move", (gameID, token, move, player, updatedBoardState, ack) =>{
    console.log("updata ", updatedBoardState);
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log("Token verification failed:", err);
        if (typeof ack === 'function') ack({ error: "Invalid token" });
        return;
      }
    });

    dbGet(
      `SELECT [PlayerX], [PlayerO], [CurrentTurn] FROM [Games] WHERE [GameID] = @p1`,
      [gameID],
      (err, row) => {
        if (err) {
          console.log(err)
          if (typeof ack === 'function') ack({ error: 'Database error' });
          return;
        }

        if (!row) {
          if (typeof ack === 'function') ack({ error: 'Game not found' });
          return;
        }

        const nextTurn = row.PlayerX === player ? row.PlayerO : row.PlayerX;
        const opponentID = row.PlayerX === player ? row.PlayerO : row.PlayerX;

        // Accept either a parsed board (array) or a JSON string.
        const boardString = (typeof updatedBoardState === 'string') ? updatedBoardState : JSON.stringify(updatedBoardState);
        dbRun(
          `UPDATE [Games] SET [BoardState] = @p1, [CurrentTurn] = @p2 WHERE [GameID] = @p3`,
          [boardString, nextTurn, gameID],
          (err) => {
            if (err) {
              console.log(err)
              if (typeof ack === 'function') ack({ error: 'Database error' });
              return;
            }
          }
        );

        // Parse board for win checking if needed
        let boardForCheck = updatedBoardState;
        try {
          if (typeof updatedBoardState === 'string') boardForCheck = JSON.parse(updatedBoardState);
        } catch (e) {
          console.log('Failed to parse updatedBoardState for win check:', e);
          boardForCheck = updatedBoardState;
        }

        const playerSymbol = row.PlayerX === player ? 'X' : 'O';
        if (CheckWin(move.x, move.y, move.z, boardForCheck, playerSymbol)){
          dbRun(`UPDATE [Games] SET [Winner] = @p1 WHERE [GameID] = @p2`, [player, gameID], (err) => {
            if (err) {
              console.log(err)
            }
          });
        }

        if (userConnections[player]) io.to(userConnections[player]).emit("update", "move made");
        if (userConnections[opponentID]) io.to(userConnections[opponentID]).emit("update", "move made");

        if (typeof ack === 'function') ack({ ok: true });
      }
    );
  });

  socket.on("get winner", (gameID, callback) =>{
    dbGet(`SELECT [Winner] FROM [Games] WHERE [GameID] = @p1`, [gameID], (err, row) => {
      if (err) {
        console.log(err)
        callback({ error: 'Database error' });
        return;
      }
      console.log("Winner data: ", row)
      callback(row);
    });
  });

  socket.on("decline invitation", ({recieverID, invite})=>{
    console.log("declined invitation")
    socket.to(userConnections[invite]).emit("invitation declined", recieverID);
  })

  socket.on("get game history", (username, callback) =>{
    console.log("Fetching game history for: " + username)
    dbAll(
      `SELECT [GameID], [PlayerX], [PlayerO], [Winner] FROM [Games]
       WHERE ([PlayerX] = @p1 OR [PlayerO] = @p1) AND [Winner] IS NOT NULL`,
      [username],
      (err, rows) => {
        if (err) {
          console.log(err)
          callback({ error: 'Database error' });
          return;
        }
        callback(rows);
      }
    );
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    delete userConnections[userID];
    console.log(userConnections);
  });
});

initDb()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    server.listen(PORT, () => {
      console.log(`Server + Socket.IO running on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database', err);
    process.exit(1);
  });
