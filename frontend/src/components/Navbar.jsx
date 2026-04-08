import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Badge, Avatar, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const profile = JSON.parse(localStorage.getItem('profile'))?.user;

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Logo - Mobile only */}
      <h1 className="text-xl font-bold tracking-tighter sentigram-gradient md:hidden" onClick={() => navigate('/home')}>
        Sentigram
      </h1>

      {/* Spacing for desktop if no search bar */}
      <div className="hidden md:block flex-1"></div>

      {/* Action Icons */}
      <div className="flex items-center gap-2 md:gap-4">
        <IconButton className="hover:bg-gray-50 p-2" onClick={() => navigate('/notifications')}>
          <Badge color="error" variant="dot" overlap="circular">
            <NotificationsNoneOutlinedIcon className="text-gray-700" />
          </Badge>
        </IconButton>
        
        <div 
          className="flex items-center gap-2 md:gap-3 pl-2 border-l border-gray-100 cursor-pointer group"
          onClick={() => navigate(`/profile/${profile?.username}`)}
        >
          <Avatar
            alt="User"
            src={profile?.profilePic || "https://mui.com/static/images/avatar/1.jpg"}
            className="w-8 h-8 md:w-9 md:h-9 border-2 border-transparent group-hover:border-pink-200"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;


