import React, { useState } from "react";
import {
  Menu, MenuItem, Avatar, IconButton, Paper
} from "@mui/material";
import {
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
  ChatBubbleOutline as ChatIcon,
  Send as SendIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Bookmark as BookmarkIcon,
  MoreHoriz as MoreIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "../api";

function Post({ post, onDelete }) {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [likes, setLikes] = useState(post.likes || []);

  const user = JSON.parse(localStorage.getItem("profile"))?.user;
  const currentUserId = user?.id;

  const [isSaved, setIsSaved] = useState(
    user?.saved?.includes(post._id)
  );

  const isOwner = (post.user?._id || post.user) === currentUserId;
  const hasLiked = likes.includes(currentUserId);

  const username = post.user?.username || "User";
  const profilePic = post.user?.profilePic;

  const imageUrl = post.image?.startsWith("http")
    ? post.image
    : `http://localhost:5001${post.image}`;

  // Like / Unlike
  const handleLike = async () => {
    try {
      const res = await axios.patch(`/posts/${post._id}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  // Save / Unsave
  const handleSave = async () => {
    try {
      await axios.patch(`/users/save/${post._id}`);
      setIsSaved(!isSaved);

      const profile = JSON.parse(localStorage.getItem("profile"));

      if (isSaved) {
        profile.user.saved = profile.user.saved.filter(
          (id) => id !== post._id
        );
      } else {
        profile.user.saved.push(post._id);
      }

      localStorage.setItem("profile", JSON.stringify(profile));
    } catch (err) {
      console.error(err);
    }
  };

  // Delete (fixed - no reload)
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await axios.delete(`/posts/${post._id}`);
      onDelete?.(post._id); // update parent state
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Paper className="border md:rounded-2xl overflow-hidden">

      {/* Header */}
      <div className="flex justify-between p-4">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate(`/profile/${username}`)}
        >
          <Avatar src={profilePic} />
          <div>
            <p className="text-sm font-bold">{username}</p>
            <p className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {isOwner && (
            <MenuItem onClick={handleDelete} className="!text-red-500">
              Delete
            </MenuItem>
          )}
          <MenuItem onClick={() => setAnchorEl(null)}>
            Cancel
          </MenuItem>
        </Menu>
      </div>

      {/* Image */}
      <img
        src={imageUrl}
        alt="post"
        className="w-full max-h-[600px] object-contain"
      />

      {/* Actions */}
      <div className="p-4">
        <div className="flex justify-between mb-2">
          <div className="flex gap-4">
            <IconButton onClick={handleLike}>
              {hasLiked ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            <ChatIcon />
            <SendIcon />
          </div>

          <IconButton onClick={handleSave}>
            {isSaved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
          </IconButton>
        </div>

        {/* Content */}
        <p className="text-sm font-bold">{likes.length} likes</p>
        <p className="text-sm">
          <span className="font-bold">{username}</span> {post.caption}
        </p>
      </div>
    </Paper>
  );
}

export default Post;