import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { fetchStories, createStory } from '../api';
import StoryViewer from './StoryViewer';

const Stories = () => {
  const [stories, setStories] = React.useState([]);
  const [selectedStoryIndex, setSelectedStoryIndex] = React.useState(null);
  const profile = JSON.parse(localStorage.getItem('profile'))?.user;
  const fileInputRef = React.useRef();

  useEffect(() => {
    const getStories = async () => {
      try {
        const { data } = await fetchStories();
        setStories(data);
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    };
    getStories();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await createStory(formData);
      setStories([data, ...stories]);
    } catch (error) {
      console.error("Error uploading story:", error);
    }
  };

  return (
    <>
      <div className="w-full flex gap-4 overflow-x-auto pb-4 no-scrollbar max-w-[500px]">
        {/* Add Story Button */}
        <div 
          className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
          onClick={() => fileInputRef.current.click()}
        >
          <div className="relative p-[2px] rounded-full border border-gray-100 group-hover:scale-105 transition-transform">
            <div className="p-0.5 bg-white rounded-full">
              <Avatar src={profile?.profilePic || "https://mui.com/static/images/avatar/1.jpg"} className="w-14 h-14" />
            </div>
            <div className="absolute bottom-0 right-0 p-0.5 bg-blue-500 rounded-full border-2 border-white text-white">
              <AddIcon sx={{ fontSize: 12 }} />
            </div>
          </div>
          <span className="text-[11px] font-medium text-gray-400 truncate w-16 text-center">Your story</span>
          <input 
            type="file" 
            hidden 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={handleFileChange} 
          />
        </div>

        {stories.map((story, index) => {
          const storyImg = story.image?.startsWith('http') ? story.image : `http://localhost:5001${story.image}`;
          const username = story.user?.username || story.name;
          return (
            <div 
              key={story._id || story.id} 
              className="flex flex-col items-center gap-1.5 cursor-pointer flex-shrink-0 group"
              onClick={() => setSelectedStoryIndex(index)}
            >
              <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 group-hover:scale-105 transition-transform">
                <div className="p-0.5 bg-white rounded-full">
                  <Avatar src={storyImg} alt={username} className="w-14 h-14" />
                </div>
              </div>
              <span className="text-[11px] font-medium text-gray-700 truncate w-16 text-center">{username}</span>
            </div>
          );
        })}
      </div>

      {/* Story Viewer Modal */}
      {selectedStoryIndex !== null && (
        <StoryViewer 
          stories={stories} 
          initialIndex={selectedStoryIndex} 
          onClose={() => setSelectedStoryIndex(null)} 
        />
      )}
    </>
  );
};

export default Stories;
