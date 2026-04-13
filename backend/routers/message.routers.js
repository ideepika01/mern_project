const express = require('express');
const router = express.Router();
const { getConversations, getMessages, startConversation } = require('../controllers/message.controller');
const auth = require('../middleware/auth.middleware');

router.get('/conversations', auth, getConversations);
router.get('/:conversationId', auth, getMessages);
router.post('/start', auth, startConversation);

module.exports = router;
