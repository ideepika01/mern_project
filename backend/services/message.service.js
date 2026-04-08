const Message = require('../models/Message');
const User = require('../models/User');

const getChatMessages = async (userId, otherUserId) => {
  return await Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId },
    ],
  }).sort({ createdAt: 1 });
};

const getConversations = async (userId) => {
  const sentMessages = await Message.find({ sender: userId }).distinct('receiver');
  const receivedMessages = await Message.find({ receiver: userId }).distinct('sender');
  
  const userIds = [...new Set([...sentMessages, ...receivedMessages])];
  return await User.find({ _id: { $in: userIds } }).select('username profilePic');
};

const createMessage = async (messageData) => {
  return await Message.create(messageData);
};

module.exports = {
  getChatMessages,
  getConversations,
  createMessage,
};

