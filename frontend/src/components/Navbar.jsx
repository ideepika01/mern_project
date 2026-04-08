import React from "react";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Badge, Avatar, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

function Navbar() {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Search Bar */}
      <div className="relative w-full max-w-[400px]">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <SearchIcon className="text-gray-400" sx={{ fontSize: 18 }} />
        </div>
        <input
          type="text"
          placeholder="Search Sentigram..."
          className="block w-full py-2.5 pl-11 pr-4 bg-gray-100/60 border-none rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-100 transition-all duration-200"
        />
      </div>

      {/* Action Icons */}
      <div className="flex items-center gap-4">
        <IconButton className="hover:bg-gray-50 p-2">
          <Badge color="error" variant="dot" overlap="circular">
            <NotificationsNoneOutlinedIcon className="text-gray-700" />
          </Badge>
        </IconButton>
        
        <div className="flex items-center gap-3 pl-2 border-l border-gray-100 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-800 group-hover:text-pink-600 transition-colors">Deepika I.</p>
            <p className="text-[10px] text-gray-500 font-medium">@deepika_iyy</p>
          </div>
          <Avatar
            alt="User Profile"
            src="https://mui.com/static/images/avatar/1.jpg"
            className="w-9 h-9 border-2 border-transparent group-hover:border-pink-200 transition-all duration-200"
          />
        </div>
      </div>
    </header>
  );
}

export default Navbar;


