const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Join a room  might need to change this to reflect lobbies better
  socket.on('joinRoom', (roomName) => {
    socket.join(roomName);
    console.log(`Client ${socket.id} joined room ${roomName}`);
  });

  // Receive and broadcast message   might need to update this to send messages better
  socket.on('sendMessage', ({ room, message }) => {
    io.to(room).emit('receiveMessage', {
      from: socket.id,
      text: message
    });
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Socket.IO server running at http://localhost:${PORT}`);
});