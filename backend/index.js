const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');
require('dotenv').config();

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const http = require('http');

// Connect to Database
connectDB();

const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const port = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const postRoutes = require('./routers/post.routers');
const userRoutes = require('./routers/user.routers');
const authRoutes = require('./routers/auth.routers');
const storyRoutes = require('./routers/story.routers');
const messageRoutes = require('./routers/message.routers');

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/messages', messageRoutes);


// Socket.io logic
const Message = require('./models/Message');
const Conversation = require('./models/Conversation');

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join_room', (data) => {
    socket.join(data);
    console.log(`User ${socket.id} joined room: ${data}`);
  });

  socket.on('send_message', async (data) => {
    try {
      const { conversationId, sender, text } = data;
      
      // Save message to DB
      const newMessage = await Message.create({ conversationId, sender, text });
      
      // Update conversation last message
      await Conversation.findByIdAndUpdate(conversationId, { lastMessage: text });

      // Emit to room
      io.to(conversationId).emit('receive_message', newMessage);
    } catch (error) {
      console.error("Socket error:", error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});


app.get('/', (req, res) => {
  res.send('API is running...');
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start Server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

