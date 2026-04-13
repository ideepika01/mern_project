const Post = require("../models/Post");

// Get latest posts
const getAllPosts = async () => {
  return Post.find()
    .populate("user", "username profilePic")
    .sort({ createdAt: -1 })
    .limit(10);
};

// Create new post
const createPost = async (data) => {
  return Post.create(data);
};

// Explore posts (same as all posts for now)
const getExplorePosts = async () => {
  return getAllPosts(); // reuse instead of duplicate code
};

// Like / Unlike post
const likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const hasLiked = post.likes.includes(userId);

  if (hasLiked) {
    post.likes = post.likes.filter(id => id.toString() !== userId.toString());
  } else {
    post.likes.push(userId);
  }

  await post.save(); // simpler than findByIdAndUpdate

  return post.populate("user", "username profilePic");
};

// Add comment
const commentPost = async (postId, comment) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  post.comments.push(comment);
  await post.save();

  return post.populate("user", "username profilePic");
};

// Delete post (only owner)
const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  if (post.user.toString() !== userId.toString()) {
    throw new Error("Unauthorized");
  }

  return Post.findByIdAndDelete(postId);
};

module.exports = {
  getAllPosts,
  createPost,
  getExplorePosts,
  likePost,
  commentPost,
  deletePost
};