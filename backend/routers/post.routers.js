const express = require('express');
const router = express.Router();
const { getPosts, createPost, getExplorePosts, likePost, commentPost, deletePost } = require('../controllers/post.controller');
const upload = require('../helpers/upload');
const validate = require('../middleware/validator.middleware');
const { postSchema } = require('../schemas/post.schema');
const auth = require('../middleware/auth.middleware');

router.get('/', getPosts);
router.post('/', auth, upload.single('image'), validate(postSchema), createPost);
router.get('/explore', getExplorePosts);
router.patch('/:id/like', auth, likePost);
router.post('/:id/comment', auth, commentPost);
router.delete('/:id', auth, deletePost);

module.exports = router;
