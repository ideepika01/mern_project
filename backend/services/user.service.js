const mongoose = require("mongoose");
const User = require("../models/User");
const Post = require("../models/Post");

// Get user profile + posts
const getProfileByUsername = async (username) => {
  const user = await User.findOne({ username })
    .select("-password")
    .populate("saved");

  if (!user) return null;

  const posts = await Post.find({ user: user._id })
    .sort({ createdAt: -1 })
    .limit(10);

  return { user, posts };
};

// Update profile (only allowed fields)
const updateProfile = async (userId, data) => {
  const allowed = ["username", "bio", "profilePic"];
  const update = {};

  // filter allowed fields
  for (let key of allowed) {
    if (data[key]) update[key] = data[key];
  }

  return User.findByIdAndUpdate(
    userId, // no need for new ObjectId()
    { $set: update },
    { new: true, runValidators: true }
  ).select("-password");
};

// Save / Unsave post
const toggleSavePost = async (userId, postId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const isSaved = user.saved.includes(postId);

  user.saved = isSaved
    ? user.saved.filter(id => id.toString() !== postId)
    : [...user.saved, postId];

  await user.save();
  return user.saved;
};

// Search users (exclude current user)
const searchUsers = async (query, currentUserId) => {
  return User.find({
    username: { $regex: query, $options: "i" },
    _id: { $ne: currentUserId }
  }).select("username profilePic bio");
};

// Follow / Unfollow user
const toggleFollow = async (currentUserId, targetUserId) => {
  if (currentUserId === targetUserId) {
    throw new Error("You cannot follow yourself");
  }

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    currentUser.following = currentUser.following.filter(
      id => id.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      id => id.toString() !== currentUserId
    );
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
  toggleFollow
};