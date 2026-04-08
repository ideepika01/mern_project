const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile, savePost, searchUsers, followUser } = require('../controllers/user.controller');
const auth = require('../middleware/auth.middleware');

router.get('/profile/:username', getUserProfile);
router.get('/search', auth, searchUsers);
router.put('/update', auth, updateProfile);
router.patch('/save/:postId', auth, savePost);
router.patch('/follow/:userId', auth, followUser);

module.exports = router;
