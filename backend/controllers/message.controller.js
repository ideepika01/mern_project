const Conversation = require('../models/Conversation');
const Message = require('../models/Message');

// Get all conversations for the logged-in user
const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: { $in: [req.user.id] }
        })
        .populate('participants', 'username profilePic')
        .sort({ updatedAt: -1 });
        
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get messages in a conversation
const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId
        }).sort({ createdAt: 1 });
        
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Start or get an existing conversation
const startConversation = async (req, res) => {
    try {
        const { recipientId } = req.body;
        
        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            participants: { $all: [req.user.id, recipientId] }
        });
        
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [req.user.id, recipientId]
            });
        }
        
        const populatedConversation = await Conversation.findById(conversation._id)
            .populate('participants', 'username profilePic');
            
        res.status(200).json(populatedConversation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getConversations,
    getMessages,
    startConversation
};
