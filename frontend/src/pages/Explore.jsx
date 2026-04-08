import React from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

const EXPLORE_DATA = [
  { id: 1, image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg", likes: 120, comments: 45 },
  { id: 2, image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg", likes: 300, comments: 10 },
  { id: 3, image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg", likes: 210, comments: 88 },
  { id: 4, image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg", likes: 50, comments: 5 },
  { id: 5, image: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg", likes: 900, comments: 120 },
];

function Explore() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 md:gap-6">
        {EXPLORE_DATA.map((post) => (
          <div key={post.id} className="relative aspect-square group cursor-pointer overflow-hidden rounded-md md:rounded-xl">
            <img 
              src={post.image} 
              alt="Explore content" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-6 text-white font-bold text-sm">
              <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-y-0">
                <FavoriteIcon sx={{ fontSize: 24 }} />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center gap-1.5 transition-transform duration-300 group-hover:translate-y-0">
                <ChatBubbleIcon sx={{ fontSize: 20 }} />
                <span>{post.comments}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
