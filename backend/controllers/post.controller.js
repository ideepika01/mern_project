const Post = require("../models/Post");

// Get posts (home + explore use same logic)
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username profilePic")
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Explore posts → reuse
const getExplorePosts = getPosts;

// Create post
const createPost = async (req, res) => {
  try {
    const image = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.image;

    const post = await Post.create({
      user: req.user.id,
      caption: req.body.caption,
      image
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Like / Unlike
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const userId = req.user.id;
    const hasLiked = post.likes.includes(userId);

    post.likes = hasLiked
      ? post.likes.filter(id => id.toString() !== userId)
      : [...post.likes, userId];

    await post.save();

    await post.populate("user", "username profilePic"); // no extra query

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Comment
const commentPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    post.comments.push({
      user: req.user.id,
      text: req.body.text
    });

    await post.save();
    await post.populate("user", "username profilePic");

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne(); // cleaner

    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getPosts,
  getExplorePosts,
  createPost,
  likePost,
  commentPost,
  deletePost
}