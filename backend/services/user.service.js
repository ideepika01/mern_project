const mongoose = require('mongoose');
const User = require('../models/User');
const Post = require('../models/Post');

const getProfileByUsername = async (username) => {
  const user = await User.findOne({ username })
    .select('-password')
    .populate('saved');
    
  if (!user) return null;

  const posts = await Post.find({ user: user._id }).sort({ createdAt: -1 }).limit(10);
  return { user, posts };
};

const updateProfile = async (userId, updateData) => {
  // Only allow certain fields
  const allowedUpdates = ['username', 'bio', 'profilePic'];
  const actualUpdate = {};
  Object.keys(updateData).forEach(key => {
    if (allowedUpdates.includes(key)) actualUpdate[key] = updateData[key];
  });

  return await User.findByIdAndUpdate(
    new mongoose.Types.ObjectId(userId), 
    { $set: actualUpdate }, 
    { new: true, runValidators: true }
  ).select('-password');
};

const toggleSavePost = async (userId, postId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');

  const isSaved = user.saved.includes(postId);
  if (isSaved) {
    user.saved = user.saved.filter(id => id.toString() !== postId);
  } else {
    user.saved.push(postId);
  }

  await user.save();
  return user.saved;
};

const searchUsers = async (query, currentUserId) => {
  return await User.find({
    $and: [
      { username: { $regex: query, $options: 'i' } },
      { _id: { $ne: new mongoose.Types.ObjectId(currentUserId) } }
    ]
  }).select('username profilePic bio');
};

const toggleFollow = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) throw new Error("You cannot follow yourself");

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) throw new Error("User not found");

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
    targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId);
  } else {
    currentUser.following.push(targetUserId);
    targetUser.followers.push(currentUserId);
  }

  await currentUser.save();
  await targetUser.save();

  return { 
    isFollowing: !isFollowing,
    followersCount: targetUser.followers.length,
    followingCount: currentUser.following.length
  };
};

module.exports = {
  getProfileByUsername,
  updateProfile,
  toggleSavePost,
  searchUsers,
  toggleFollow,
};
