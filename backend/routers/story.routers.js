const express = require('express');
const router = express.Router();
const { getStories, createStory } = require('../controllers/story.controller');
const auth = require('../middleware/auth.middleware');
const upload = require('../helpers/upload');

router.get('/', getStories);
router.post('/', auth, upload.single('image'), createStory);

module.exports = router;
