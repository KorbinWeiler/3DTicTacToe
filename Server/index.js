const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const jwt = require('jsonwebtoken')
require("dotenv").config()

const app = express();
app.use(cors());

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

  socket.on("authenticate user", (userID) =>{
    const token = jwt.sign({
      userID: userID
    }, "aifjhioajfiaj" , { expiresIn: '1h' })
    //sessionStorage.setItem("sessionToken", token)
    io.to(userConnections[userID]).emit("Authenticated", token)
  })

  socket.on('sendPlay', (opponentID, senderID, play) => {
    console.log("Play: " + play)
    console.log("ID: " + opponentID)
    //send the play back to the player again
    io.to(userConnections[senderID]).emit("replay play", play)
    socket.to(userConnections[opponentID]).emit("recieve play", {
      opponentPlay: play
    })
  })


  socket.on('invite', (opponentID, senderID) => {
    io.to(userConnections[opponentID]).emit("game invite", senderID)
  })

  socket.on("request users", ()=>{
    console.log("no")
    socket.emit("active players", activeUser)
    // io.to(socket).emit("active players", activeUser)
  })

  socket.on('accept invitation', (opponentID, hostID) =>{
    // socket.to(userConnections[opponentID]).emit({
    //   lobbyID: 1,
    //   yourTurn: true,
    //   board: null
    // })
    console.log("accept invitation")
    console.log(userConnections[opponentID])
    const lobby = getLobbyID();
    io.to(userConnections[hostID]).emit("add game", lobby, opponentID, hostID)
    io.to(userConnections[opponentID]).emit("add game", lobby, opponentID, hostID)
  
  })

  socket.on("test", (arg)=>{
    console.log("SI")
  })

  socket.on("decline invitation", ({recieverID, invite})=>{
    console.log("declined invitation")
    socket.to(userConnections[invite]).emit("invitation declined", recieverID);
  })

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}`);
});