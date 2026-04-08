import React from 'react';
import { Avatar } from '@mui/material';

const Stories = ({ stories }) => {
  return (
    <div className="w-full flex gap-4 overflow-x-auto pb-4 no-scrollbar">
      {stories.map((story) => (
        <div key={story.id} className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group">
          <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 group-hover:scale-105 transition-transform">
            <div className="p-0.5 bg-white rounded-full">
              <Avatar src={story.image} alt={story.name} className="w-14 h-14" />
            </div>
          </div>
          <span className="text-[11px] font-medium text-gray-700 truncate w-16 text-center">{story.name}</span>
        </div>
      ))}
    </div>
  );
};

export default Stories;
