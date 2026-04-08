const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getConversations } = require('../controllers/message.controller');
const validate = require('../middleware/validator.middleware');
const { messageSchema } = require('../schemas/message.schema');

const auth = require('../middleware/auth.middleware');

router.get('/conversations/:userId', auth, getConversations);
router.get('/:userId/:otherUserId', auth, getMessages);
router.post('/', auth, validate(messageSchema), sendMessage);

module.exports = router;

