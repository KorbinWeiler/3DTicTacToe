const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const env = require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.json());
app.use(cors());

const SECRET = env.JWT_SECRET;
const activeUsers = {}; // Store active users for Socket.IO
const users = []; // In-memory user store for demo

// Create HTTP server and Socket.IO server
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  users.push({ username, password: hashed });
  res.json({ message: 'User registered' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// Protected route
app.get('/profile', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  const token = auth.split(' ')[1];
  try {
    const payload = jwt.verify(token, SECRET);
    res.json({ user: payload.username });
  } catch {
    res.sendStatus(401);
  }
});

// Socket.IO implementation
io.on('connection', (socket) => {
  function addFriendRequest(data){
    console.log(`Friend request from ${data}`);
    // Logic to handle friend request
  }

  function addFriend(data){
    console.log(`Friend added: ${data}`);
    // Logic to handle adding a friend
  }

  function addGameInvite(data){
    console.log(`Game invite from ${data}`);
    // Logic to handle game invite
  }

  function addGame(data){
    console.log(`Game added: ${data}`);
  }

  function movePlayed(data){
    console.log(`Move played: ${data}`);
    // Logic to handle move played
  }

  const eventList = {"FriendRequest": addFriendRequest, "AddFriend": addFriend, "GameInvite": addGameInvite, "AddGame": addGame,
    "MovePlayed": movePlayed};

  function handleEvent(eventList, eventType, targetUser, data){
    eventList[eventType](data);
    io.to(activeUsers[targetUser]).emit('Update', data);
  }

  console.log('A user connected:', socket.id);
  socket.emit('Users Updated', socket.id);
  activeUsers[socket.userName] = socket.id; // map username to socket ID
 
  // Example: broadcast a message to all clients
  socket.on('Inform', (content) => {
    handleEvent(eventList, content.type, content.data.TargetUser, content.data);
    io.to(TargetUser.ID).emit('Update', msg);
  });

  // Example: handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    for (const [username, id] of Object.entries(activeUsers)) {
      if (id === socket.id) {
        delete activeUsers[username];
        break;
      }
    }
    socket.broadcast.emit('Users Updated', socket.id);
  });
});

server.listen(4000, () => console.log('Server running on http://localhost:4000'));