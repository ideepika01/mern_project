const Post = require('../models/Post');

// Get all posts for the home feed (limited to latest 10)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username profilePic')
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new post
const createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;

    const newPost = await Post.create({
      user: req.user.id,
      caption,
      image
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get posts for the explore page
const getExplorePosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username profilePic')
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like or Unlike a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(id => id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();
    const updatedPost = await Post.findById(post._id).populate('user', 'username profilePic');
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Comment on a post
const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({ user: req.user.id, text: req.body.text });
    await post.save();

    const updatedPost = await Post.findById(post._id).populate('user', 'username profilePic');
    res.status(201).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a post (only if the user owns it)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id) {
       return res.status(403).json({ message: "Not authorized to delete this post" });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPosts,
  createPost,
  getExplorePosts,
  likePost,
  commentPost,
  deletePost
};
