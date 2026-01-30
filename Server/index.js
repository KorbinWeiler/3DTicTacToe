const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const { json } = require('stream/consumers');
const { callbackify } = require('util');
const { InitializeBlankBoard, CheckWin } = require('./utils/GameUtils');
const sqlite3 = require('sqlite3').verbose();
require("dotenv").config()


const app = express();
app.use(express.json());
app.use(cors());
const db = new sqlite3.Database('./database/data.db', (err) => {
  if (err) {
    console.error('Could not connect to database', err);
  } else {
    console.log('Connected to database');
  }});

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
  db.get(`SELECT PasswordHash FROM Users WHERE Username = '${req.body.username}';`, (err, row) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Database error' });
    }
    if (!row || row.PasswordHash !== req.body.password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }1
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
  db.run(`DELETE FROM Users WHERE Username = 'test3';`);
  console.log("Registering user: ", username, email);
  db.run(`INSERT INTO Users (Username, PasswordHash, Email) VALUES ('${username}', '${password}', '${email}')`, function(err) {
    if (err) {
      console.log(err)
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(201).json({ message: 'User registered successfully' });
  });
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
    db.all(`SELECT GameID, PlayerX, PlayerO, BoardState, CurrentTurn FROM Games WHERE PlayerX = '${username}' OR PlayerO = '${username}' and Winner IS NULL;`, (err, rows) => {
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
    db.get(`SELECT * FROM Games WHERE GameID = '${gameID}';`, (err, row) => {
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
    db.get(`SELECT BoardState FROM Games WHERE GameID = '${gameID}';`, (err, row) => {
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
    db.run(`INSERT INTO Invites (FromUser, ToUser, DateSent, Status) VALUES ('${senderID}', '${opponentID}', '${now}', 'pending');`, function(err) {
      if (err) {
        console.log(err)
        return;
      }
    });
    io.to(userConnections[opponentID]).emit("update", "invite received");
  })

  socket.on('get invites', (username, callback) =>{
    db.all(`SELECT FromUser, DateSent FROM Invites WHERE ToUser = '${username}' and Status = 'pending';`, (err, rows) => {
      if (err) {
        console.log(err)
        callback({ error: 'Database error' });
        return;
      }
      callback(rows);
    });
  })

  socket.on("request users", ()=>{
    socket.emit("active players", activeUser)
    // io.to(socket).emit("active players", activeUser)
  })

  socket.on('accept invitation', (opponentID, hostID, date) =>{
    const blankBoard = InitializeBlankBoard();
    db.run(`UPDATE Invites SET Status = 'accepted' WHERE FromUser = '${hostID}' AND ToUser = '${opponentID}' and DateSent = '${date}';`, function(err) {
      if (err) {
        console.log(err)
        return;
      }
    });

    db.run(`INSERT INTO Games (PlayerX , PlayerO, BoardState, CurrentTurn) VALUES ('${opponentID}', '${hostID}', '${JSON.stringify(blankBoard)}', '${opponentID}');`, function(err) {
      if (err) {
        console.log(err)
        return;
      }
    });
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

    db.get(`SELECT PlayerX, PlayerO, CurrentTurn FROM Games WHERE GameID = '${gameID}';`, (err, row) => {
      if (err) {
        console.log(err)
        if (typeof ack === 'function') ack({ error: 'Database error' });
        return;
      }

      const nextTurn = row.PlayerX === player ? row.PlayerO : row.PlayerX;
      const opponentID = row.PlayerX === player ? row.PlayerO : row.PlayerX;

      // Accept either a parsed board (array) or a JSON string. Use parameterized queries
      // to avoid double-stringifying and SQL injection.
      const boardString = (typeof updatedBoardState === 'string') ? updatedBoardState : JSON.stringify(updatedBoardState);
      db.run(`UPDATE Games SET BoardState = ?, CurrentTurn = ? WHERE GameID = ?;`, [boardString, nextTurn, gameID], function(err) {
        if (err) {
          console.log(err)
          if (typeof ack === 'function') ack({ error: 'Database error' });
          return;
        }
      });

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
        db.run(`UPDATE Games SET Winner = ? WHERE GameID = ?;`, [player, gameID], function(err) {
          if (err) {
            console.log(err)
          }
        });
      }

      if (userConnections[player]) io.to(userConnections[player]).emit("update", "move made");
      if (userConnections[opponentID]) io.to(userConnections[opponentID]).emit("update", "move made");

      if (typeof ack === 'function') ack({ ok: true });
    });
  });

  socket.on("get winner", (gameID, callback) =>{
    db.get(`SELECT Winner FROM Games WHERE GameID = '${gameID}';`, (err, row) => {
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
    db.all(`SELECT GameID, PlayerX, PlayerO, Winner FROM Games WHERE (PlayerX = '${username}' OR PlayerO = '${username}') AND Winner IS NOT NULL;`, (err, rows) => {
      if (err) {
        console.log(err)
        callback({ error: 'Database error' });
        return;
      }
      callback(rows);
    });
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