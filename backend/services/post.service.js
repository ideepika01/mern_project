const Post = require('../models/Post');

const getAllPosts = async () => {
  return await Post.find().populate('user', 'username profilePic').sort({ createdAt: -1 }).limit(10);
};

const createPost = async (postData) => {
  return await Post.create(postData);
};

const getExplorePosts = async () => {
  return await Post.find().populate('user', 'username profilePic').sort({ createdAt: -1 }).limit(10);
};

const likePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  
  const index = post.likes.findIndex((id) => id.toString() === userId.toString());
  if (index === -1) {
    post.likes.push(userId);
  } else {
    post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
  }
  
  return await Post.findByIdAndUpdate(postId, post, { new: true }).populate('user', 'username profilePic');
};

const commentPost = async (postId, comment) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  
  post.comments.push(comment);
  
  return await Post.findByIdAndUpdate(postId, post, { new: true }).populate('user', 'username profilePic');
};

const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error('Post not found');
  if (post.user.toString() !== userId.toString()) throw new Error('Unauthorized');
  
  return await Post.findByIdAndDelete(postId);
};

module.exports = {
  getAllPosts,
  createPost,
  getExplorePosts,
  likePost,
  commentPost,
  deletePost,
};
