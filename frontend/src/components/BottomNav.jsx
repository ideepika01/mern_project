import React from "react";
import { SidebarData } from "./SidebarData";
import { useNavigate, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const mobileItems = SidebarData.filter(item => 
    ["Home", "Explore", "Create", "Messages", "Profile"].includes(item.title)
  );

  return (
    <div className="flex justify-around items-center h-14 w-full">
      {mobileItems.map((item) => {
        const active = location.pathname === item.link;
        return (
          <IconButton 
            key={item.title} 
            onClick={() => navigate(item.link)}
            className={`transition-all duration-200 ${active ? "text-[#E1306C]" : "text-gray-500"}`}
          >
            {item.icon}
          </IconButton>
        );
      })}
    </div>
  );
}

export default BottomNav;
