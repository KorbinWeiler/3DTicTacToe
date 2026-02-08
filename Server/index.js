const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { json } = require('stream/consumers');
const { callbackify } = require('util');
const { InitializeBlankBoard, CheckWin } = require('./utils/GameUtils');
const { Pool } = require('pg');
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors());

// Postgres connection pool - configure via DATABASE_URL or individual PG_* env vars
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
pool.on('error', (err) => console.error('Unexpected PG error', err));
console.log('Postgres pool created');

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

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const { rows } = await pool.query('SELECT PasswordHash FROM Users WHERE Username = $1', [username]);
    const row = rows[0];
    if (!row || row.passwordhash !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/guestLogin', (req, res) => {
  let guestUsername = `Guest${Math.floor(Math.random() * 1000000000)}`;
  while (guestUsername in userConnections){
    guestUsername = `Guest${Math.floor(Math.random() * 1000000000)}`;
  }
  const token = jwt.sign({ username: guestUsername }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.status(200).json({ token: token, user: guestUsername });
}); 

app.post('/register', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    console.log("Registering user: ", username, email);
    await pool.query('INSERT INTO Users (Username, PasswordHash, Email) VALUES ($1, $2, $3)', [username, password, email]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(process.env.SERVER_PORT, () => console.log('Server running'));

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
    (async () => {
      try {
        const res = await pool.query(`SELECT GameID, PlayerX, PlayerO, BoardState, CurrentTurn FROM Games WHERE (PlayerX = $1 OR PlayerO = $1) AND Winner IS NULL`, [username]);
        callback(res.rows);
      } catch (err) {
        console.error(err);
        callback({ error: 'Database error' });
      }
    })();
  })

  socket.on('get game', (gameID, callback) =>{
    (async () => {
      try {
        const res = await pool.query('SELECT * FROM Games WHERE GameID = $1', [gameID]);
        const row = res.rows[0] || null;
        console.log("game data: ", row)
        callback(row);
      } catch (err) {
        console.error(err);
        callback({ error: 'Database error' });
      }
    })();
  });

  socket.on('get board', (gameID, callback) =>{
    console.log("Fetching board for gameID: " + gameID)
    (async () => {
      try {
        const res = await pool.query('SELECT BoardState FROM Games WHERE GameID = $1', [gameID]);
        const row = res.rows[0] || null;
        console.log("Ongoing games: ", row)
        callback(row);
      } catch (err) {
        console.error(err);
        callback({ error: 'Database error' });
      }
    })();
  });


  socket.on('invite', (opponentID, senderID) => {
    const now = new Date().toISOString();
    (async () => {
      try {
        await pool.query('INSERT INTO Invites (FromUser, ToUser, DateSent, Status) VALUES ($1, $2, $3, $4)', [senderID, opponentID, now, 'pending']);
      } catch (err) {
        console.error(err);
      }
    })();
    io.to(userConnections[opponentID]).emit("update", "invite received");
  })

  socket.on('get invites', (username, callback) =>{
    (async () => {
      try {
        const res = await pool.query('SELECT FromUser, DateSent FROM Invites WHERE ToUser = $1 AND Status = $2', [username, 'pending']);
        callback(res.rows);
      } catch (err) {
        console.error(err);
        callback({ error: 'Database error' });
      }
    })();
  })

  socket.on("request users", ()=>{
    socket.emit("active players", activeUser)
    // io.to(socket).emit("active players", activeUser)
  })

  socket.on('accept invitation', (opponentID, hostID, date) =>{
    const blankBoard = InitializeBlankBoard();
    (async () => {
      try {
        await pool.query('UPDATE Invites SET Status = $1 WHERE FromUser = $2 AND ToUser = $3 AND DateSent = $4', ['accepted', hostID, opponentID, date]);
        await pool.query('INSERT INTO Games (PlayerX, PlayerO, BoardState, CurrentTurn) VALUES ($1, $2, $3, $4)', [opponentID, hostID, JSON.stringify(blankBoard), opponentID]);
      } catch (err) {
        console.error(err);
      }
    })();
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

    (async () => {
      try {
        const res = await pool.query('SELECT PlayerX, PlayerO, CurrentTurn FROM Games WHERE GameID = $1', [gameID]);
        const row = res.rows[0];
        if (!row) {
          if (typeof ack === 'function') ack({ error: 'Game not found' });
          return;
        }

        const nextTurn = row.playerx === player ? row.playero : row.playerx;
        const opponentID = row.playerx === player ? row.playero : row.playerx;

        const boardString = (typeof updatedBoardState === 'string') ? updatedBoardState : JSON.stringify(updatedBoardState);
        await pool.query('UPDATE Games SET BoardState = $1, CurrentTurn = $2 WHERE GameID = $3', [boardString, nextTurn, gameID]);

        let boardForCheck = updatedBoardState;
        try {
          if (typeof updatedBoardState === 'string') boardForCheck = JSON.parse(updatedBoardState);
        } catch (e) {
          console.log('Failed to parse updatedBoardState for win check:', e);
          boardForCheck = updatedBoardState;
        }

        const playerSymbol = row.playerx === player ? 'X' : 'O';
        if (CheckWin(move.x, move.y, move.z, boardForCheck, playerSymbol)){
          await pool.query('UPDATE Games SET Winner = $1 WHERE GameID = $2', [player, gameID]);
        }

        if (userConnections[player]) io.to(userConnections[player]).emit("update", "move made");
        if (userConnections[opponentID]) io.to(userConnections[opponentID]).emit("update", "move made");

        if (typeof ack === 'function') ack({ ok: true });
      } catch (err) {
        console.error(err);
        if (typeof ack === 'function') ack({ error: 'Database error' });
      }
    })();
  });

  socket.on("get winner", (gameID, callback) =>{
    (async () => {
      try {
        const res = await pool.query('SELECT Winner FROM Games WHERE GameID = $1', [gameID]);
        const row = res.rows[0] || null;
        console.log("Winner data: ", row)
        callback(row);
      } catch (err) {
        console.error(err);
        callback({ error: 'Database error' });
      }
    })();
  });

  socket.on("decline invitation", ({recieverID, invite})=>{
    console.log("declined invitation")
    socket.to(userConnections[invite]).emit("invitation declined", recieverID);
  })

  socket.on("get game history", (username, callback) =>{
    console.log("Fetching game history for: " + username)
    (async () => {
      try {
        const res = await pool.query('SELECT GameID, PlayerX, PlayerO, Winner FROM Games WHERE (PlayerX = $1 OR PlayerO = $1) AND Winner IS NOT NULL', [username]);
        callback(res.rows);
      } catch (err) {
        console.error(err);
        callback({ error: 'Database error' });
      }
    })();
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
    delete userConnections[userID];
    console.log(userConnections);
  });
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Socket.IO server running`);
});