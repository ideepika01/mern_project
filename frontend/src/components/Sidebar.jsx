import React from "react";
import { 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
} from "@mui/material";
import { SidebarData } from "./SidebarData";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-[260px] h-screen flex flex-col border-r border-gray-100 bg-white sticky top-0 left-0">
      <div className="p-6 mb-4">
        <h1 className="text-2xl font-extrabold tracking-tighter bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text text-transparent">
          Sentigram
        </h1>
      </div>
      
      <nav className="flex-1 px-3">
        <List component="div" className="space-y-1">
          {SidebarData.map((item) => {
            const active = location.pathname === item.link;
            return (
              <ListItemButton
                key={item.title}
                onClick={() => navigate(item.link)}
                selected={active}
                className={`!rounded-xl transition-all duration-200 ${
                  active 
                  ? "bg-pink-50 !text-[#E1306C]" 
                  : "text-gray-600 hover:bg-gray-50"
                }`}
                sx={{
                  "&.Mui-selected": {
                    bgcolor: "#fff1f2",
                    "&:hover": { bgcolor: "#ffe4e6" }
                  }
                }}
              >
                <ListItemIcon className={`min-w-[40px] ${active ? "text-[#E1306C]" : "text-gray-500"}`}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.title} 
                  primaryTypographyProps={{ 
                    className: `text-[15px] ${active ? "font-bold" : "font-medium"}`
                  }} 
                />
              </ListItemButton>
            );
          })}
        </List>
      </nav>
      
      <div className="p-4 border-t border-gray-50 flex flex-col gap-2">
        <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => navigate(`/profile/${JSON.parse(localStorage.getItem('profile'))?.user?.username}`)}>
          <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
            <img src={JSON.parse(localStorage.getItem('profile'))?.user?.profilePic || "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg"} className="w-full h-full object-cover" />
          </div>
          <span className="text-sm font-semibold text-gray-700 truncate">{JSON.parse(localStorage.getItem('profile'))?.user?.username || "Account"}</span>
        </div>
        <div 
          className="flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-50 cursor-pointer transition-colors"
          onClick={() => {
            localStorage.removeItem('profile');
            navigate('/login');
          }}
        >
          <span className="text-sm font-bold">Log Out</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;


