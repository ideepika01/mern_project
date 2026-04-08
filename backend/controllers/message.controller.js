const Message = require('../models/Message');
const User = require('../models/User');

// --- GET MESSAGES BETWEEN TWO USERS ---
const getMessages = async (req, res) => {
  try {
    const { userId, otherUserId } = req.params;
    const messages = await Message.find({
      $or: [
        { sender: userId, receiver: otherUserId },
        { sender: otherUserId, receiver: userId },
      ],
    }).sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- SEND A NEW MESSAGE ---
const sendMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    
    // Emit to socket for real-time delivery
    req.app.get('io').emit("getMessage", { 
        senderId: message.sender, 
        receiverId: message.receiver, 
        text: message.text, 
        createdAt: message.createdAt 
    });
    
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- GET ALL ACTIVE CONVERSATIONS FOR A USER ---
const getConversations = async (req, res) => {
  try {
    const { userId } = req.params;
    const sent = await Message.find({ sender: userId }).distinct('receiver');
    const received = await Message.find({ receiver: userId }).distinct('sender');
    
    const userIds = [...new Set([...sent, ...received])];
    const users = await User.find({ _id: { $in: userIds } }).select('username profilePic');
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMessages, sendMessage, getConversations };
