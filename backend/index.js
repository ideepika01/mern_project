const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
require('dotenv').config();

const http = require('http');
const { Server } = require('socket.io');

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5001;

// Socket.io logic
let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

// Make io accessible in routes
app.set('io', io);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const postRoutes = require('./routers/post.routers');
const userRoutes = require('./routers/user.routers');
const messageRoutes = require('./routers/message.routers');
const authRoutes = require('./routers/auth.routers');
const storyRoutes = require('./routers/story.routers');

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Start Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

