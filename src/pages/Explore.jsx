import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';

const EXPLORE_DATA = [
    { id: 1, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 120, comments: 45 },
    { id: 2, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 300, comments: 10 },
    { id: 3, image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 210, comments: 88 },
    { id: 4, image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 50, comments: 5 },
    { id: 5, image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 900, comments: 120 },
    { id: 6, image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 320, comments: 40 },
    { id: 7, image: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 80, comments: 2 },
    { id: 8, image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 234, comments: 55 },
    { id: 9, image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60", likes: 678, comments: 90 },
];

function Explore() {
    return (
        <div className="explore">
            <div className="explore-grid">
                {EXPLORE_DATA.map((post) => (
                    <div key={post.id} className="explore-item">
                        <img src={post.image} alt="Explore content" />
                        <div className="overlay">
                            <div className="overlay-info">
                                <FavoriteIcon />
                                <span>{post.likes}</span>
                            </div>
                            <div className="overlay-info">
                                <ChatBubbleIcon />
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
