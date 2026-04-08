import React, { useState } from 'react';
import { Menu, MenuItem, Avatar, IconButton, Paper } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SendIcon from '@mui/icons-material/Send';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useNavigate } from 'react-router-dom';
import { likePost, savePost, deletePost } from '../api';

function Post({ post }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [likes, setLikes] = useState(post.likes || []);
  
  // Get the logged-in user from localStorage
  const loggedInProfile = JSON.parse(localStorage.getItem('profile'))?.user;
  const currentUserId = loggedInProfile?.id;
  
  // State for bookmark status
  const [isSaved, setIsSaved] = useState(loggedInProfile?.saved?.includes(post._id));

  // Determine if the current post belongs to the logged-in user
  const isPostOwner = (post.user?._id || post.user) === currentUserId;
  
  // Determine if the user has already liked the post
  const hasLiked = likes.includes(currentUserId);

  // Helper variables for clean JSX
  const username = post.user?.username || 'User';
  const profilePic = post.user?.profilePic;
  const imageUrl = post.image?.startsWith('http') ? post.image : `http://localhost:5001${post.image}`;

  // Handle Liking a post
  const handleLikeAction = async () => {
    try {
      const response = await likePost(post._id);
      setLikes(response.data.likes);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Handle Saving a post
  const handleSaveAction = async () => {
    try {
      await savePost(post._id);
      setIsSaved(!isSaved);
      
      // Update local storage so the state is remembered on refresh
      const profileData = JSON.parse(localStorage.getItem('profile'));
      if (isSaved) {
        profileData.user.saved = profileData.user.saved.filter(id => id !== post._id);
      } else {
        profileData.user.saved.push(post._id);
      }
      localStorage.setItem('profile', JSON.stringify(profileData));
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  // Handle Deleting a post
  const handleDeletePost = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(post._id);
        window.location.reload(); // Refresh to update the feed
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  return (
    <Paper elevation={0} className="border border-gray-100 md:rounded-2xl overflow-hidden bg-white">
      {/* 1. Header: Avatar and Username */}
      <div className="flex items-center justify-between p-4">
        <div 
          className="flex items-center gap-3 cursor-pointer" 
          onClick={() => navigate(`/profile/${username}`)}
        >
          <Avatar src={profilePic} className="w-8 h-8 border" />
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">{username}</span>
            <span className="text-[10px] text-gray-400 font-medium">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        
        {/* Menu button for delete option */}
        <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreHorizIcon fontSize="small" />
        </IconButton>
        
        <Menu 
          anchorEl={anchorEl} 
          open={Boolean(anchorEl)} 
          onClose={() => setAnchorEl(null)}
        >
          {isPostOwner && (
            <MenuItem onClick={handleDeletePost} className="!text-red-500 !font-bold">
              Delete Post
            </MenuItem>
          )}
          <MenuItem onClick={() => setAnchorEl(null)}>Cancel</MenuItem>
        </Menu>
      </div>

      {/* 2. Media Section: Image only */}
      <div className="w-full bg-gray-50 flex items-center justify-center">
        <img 
          src={imageUrl} 
          alt="Post Content" 
          className="w-full h-auto max-h-[600px] object-contain" 
        />
      </div>

      {/* 3. Footer Section: Actions, Likes, and Caption */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <IconButton size="small" onClick={handleLikeAction} className="!p-0">
              {hasLiked ? (
                <FavoriteIcon className="text-red-500" />
              ) : (
                <FavoriteBorderIcon className="text-gray-700" />
              )}
            </IconButton>
            <ChatBubbleOutlineIcon className="text-gray-700 cursor-pointer" />
            <SendIcon className="text-gray-700 cursor-pointer" />
          </div>
          
          <IconButton size="small" onClick={handleSaveAction} className="!p-0">
            {isSaved ? (
              <BookmarkIcon className="text-gray-900" />
            ) : (
              <BookmarkBorderIcon className="text-gray-700" />
            )}
          </IconButton>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">{likes.length} likes</p>
          <div className="flex items-start gap-2">
            <span className="text-sm font-bold">{username}</span>
            <p className="text-sm text-gray-800">{post.caption}</p>
          </div>
          <button className="text-sm text-gray-400 mt-1 hover:text-gray-600 text-left">
            View all {post.comments?.length || 0} comments
          </button>
        </div>
      </div>
    </Paper>
  );
}

export default Post;
