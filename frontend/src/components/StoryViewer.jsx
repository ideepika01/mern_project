import React, { useState, useEffect } from 'react';
import { IconButton, Avatar, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const StoryViewer = ({ stories, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);

  const currentStory = stories[currentIndex];
  const storyImg = currentStory.image?.startsWith('http') ? currentStory.image : `http://localhost:5001${currentStory.image}`;
  const username = currentStory.user?.username || currentStory.name;
  const profilePic = currentStory.user?.profilePic || "https://mui.com/static/images/avatar/1.jpg";

  useEffect(() => {
    setProgress(0);
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 1;
      });
    }, 50); // 5 seconds total (100 * 50ms)

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
      {/* Progress Bars */}
      <div className="absolute top-4 left-0 right-0 flex gap-1 px-4 z-10">
        {stories.map((_, index) => (
          <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-[50ms] linear"
              style={{ 
                width: index === currentIndex ? `${progress}%` : index < currentIndex ? '100%' : '0%' 
              }}
            />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="absolute top-8 left-0 right-0 p-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <Avatar src={profilePic} className="w-8 h-8 border border-white" />
          <span className="text-white text-sm font-bold shadow-sm">{username}</span>
        </div>
        <IconButton onClick={onClose} className="text-white">
          <CloseIcon />
        </IconButton>
      </div>

      {/* Navigation Buttons - Desktop */}
      <div className="hidden md:flex absolute inset-0 items-center justify-between px-4 pointer-events-none">
        <IconButton 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className={`pointer-events-auto bg-white/10 hover:bg-white/20 text-white ${currentIndex === 0 ? 'opacity-0' : ''}`}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton 
          onClick={handleNext} 
          className="pointer-events-auto bg-white/10 hover:bg-white/20 text-white"
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>

      {/* Story Content */}
      <div className="relative w-full max-w-[450px] aspect-[9/16] md:max-h-[85vh] overflow-hidden rounded-xl bg-gray-900 flex items-center justify-center">
        {currentStory.image?.match(/\.(mp4|mov|webm)$/i) ? (
          <video 
            src={storyImg} 
            className="w-full h-full object-contain" 
            autoPlay 
            muted 
            playsInline
            onEnded={handleNext}
          />
        ) : (
          <img 
            src={storyImg} 
            alt="story" 
            className="w-full h-full object-cover" 
            onClick={handleNext}
          />
        )}
      </div>

      {/* Click zones for mobile */}
      <div className="md:hidden absolute inset-0 flex">
        <div className="w-1/3 h-full" onClick={handlePrev} />
        <div className="w-2/3 h-full" onClick={handleNext} />
      </div>
    </div>
  );
};

export default StoryViewer;
