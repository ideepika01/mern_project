import React from 'react';
import { Avatar, IconButton, Paper } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const Post = ({ post }) => {
  return (
    <Paper elevation={0} className="border border-gray-100 rounded-2xl overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <Avatar src={post.postImage} alt={post.user} className="w-8 h-8 border border-gray-100" />
          <div className="flex flex-col -space-y-0.5">
            <span className="text-[13px] font-bold text-gray-900 leading-tight">{post.user}</span>
            <span className="text-[10px] text-gray-500 font-medium">{post.time}</span>
          </div>
        </div>
        <IconButton size="small">
          <MoreHorizIcon fontSize="small" className="text-gray-400" />
        </IconButton>
      </div>

      {/* Image */}
      <div className="aspect-square w-full bg-gray-50 overflow-hidden">
        <img src={post.postImage} alt="Post content" className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-500" />
      </div>

      {/* Actions & Caption */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <FavoriteBorderOutlinedIcon className="text-gray-700 hover:text-red-500 cursor-pointer transition-colors" />
            <ChatBubbleOutlineOutlinedIcon className="text-gray-700 hover:text-gray-400 cursor-pointer transition-colors" />
            <SendOutlinedIcon className="text-gray-700 hover:text-gray-400 cursor-pointer transition-colors" />
          </div>
          <BookmarkBorderOutlinedIcon className="text-gray-700 hover:text-gray-400 cursor-pointer transition-colors" />
        </div>

        <div className="space-y-1.5">
          <p className="text-[13px] font-bold text-gray-900 leading-none">{post.likes} likes</p>
          <div className="flex gap-1.5">
            <span className="text-[13px] font-bold text-gray-900 leading-snug">{post.user}</span>
            <p className="text-[13px] text-gray-800 leading-snug">{post.caption}</p>
          </div>
          <button className="text-[13px] text-gray-500 hover:text-gray-600 transition-colors">
            View all {post.comments} comments
          </button>
        </div>
      </div>
    </Paper>
  );
};

export default Post;
