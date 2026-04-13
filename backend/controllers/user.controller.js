const User = require('../models/User');
const Post = require('../models/Post');

// Get a user's profile and their posts
// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
      .select('-password')
      .populate('saved');
    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const posts = await Post.find({ user: user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ user, posts });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update profile details like username, bio, and profile picture
// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { username, bio, profilePic } = req.body;
    
    // Find the user and update only the provided fields
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: { username, bio, profilePic } },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Search for users by username
// Search Users
const searchUsers = async (req, res) => {
  try {
    const query = req.query.q;
    const users = await User.find({
      username: { $regex: query, $options: 'i' },
      _id: { $ne: req.user.id } // Don't include the current user in search results
    }).select('username profilePic bio');

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Follow or Unfollow a user
// Follow User
const followUser = async (req, res) => {
  try {
    const currentUserId = req.user.id;
    const targetUserId = req.params.userId;

    if (currentUserId === targetUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const currentUser = await User.findById(currentUserId);
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(targetUserId);

    if (isFollowing) {
      // Unfollow
      currentUser.following = currentUser.following.filter(id => id.toString() !== targetUserId);
      targetUser.followers = targetUser.followers.filter(id => id.toString() !== currentUserId);
    } else {
      // Follow
      currentUser.following.push(targetUserId);
      targetUser.followers.push(currentUserId);
    }

    await currentUser.save();
    await targetUser.save();

    res.status(200).json({ 
      isFollowing: !isFollowing,
      followersCount: targetUser.followers.length,
      followingCount: currentUser.following.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Save or Unsave a post
// Save Post
const savePost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const postId = req.params.postId;

    if (user.saved.includes(postId)) {
      user.saved = user.saved.filter(id => id.toString() !== postId);
    } else {
      user.saved.push(postId);
    }

    await user.save();
    res.status(200).json(user.saved);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  updateProfile,
  searchUsers,
  followUser,
  savePost
};
