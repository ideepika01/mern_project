const Message = require("../models/Message");
const User = require("../models/User");

// Get all messages between two users
const getChatMessages = async (userId, otherUserId) => {
  return Message.find({
    $or: [
      { sender: userId, receiver: otherUserId },
      { sender: otherUserId, receiver: userId }
    ]
  }).sort({ createdAt: 1 }); // oldest first
};

// Get all users the current user has chatted with
const getConversations = async (userId) => {
  const sent = await Message.find({ sender: userId }).distinct("receiver");
  const received = await Message.find({ receiver: userId }).distinct("sender");

  const userIds = [...new Set([...sent, ...received])]; // remove duplicates

  return User.find({ _id: { $in: userIds } })
    .select("username profilePic");
};

// Create a new message
const createMessage = async (data) => {
  return Message.create(data);
};

module.exports = {
  getChatMessages,
  getConversations,
  createMessage
};