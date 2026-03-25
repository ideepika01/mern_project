import React from 'react';
import { Avatar, Button } from '@mui/material';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import GridOnOutlinedIcon from '@mui/icons-material/GridOnOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';

const PROFILE_POSTS = [
    { id: 1, image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&w=300&q=80" },
    { id: 2, image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&w=300&q=80" },
    { id: 3, image: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&w=300&q=80" },
    { id: 4, image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&w=300&q=80" },
    { id: 5, image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&w=300&q=80" },
];

function Profile() {
    return (
        <div className="profile" style={{ padding: '30px', maxWidth: '935px', margin: '0 auto', width: '100%' }}>
            
            <div className="profile-header" style={{ display: 'flex', gap: '50px', marginBottom: '40px', alignItems: 'center' }}>
                <Avatar 
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1a?ixlib=rb-4.0.3&w=150&q=80" 
                    sx={{ width: 150, height: 150 }} 
                />

                <div className="profile-info" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <h2 style={{ fontSize: '20px', fontWeight: 'normal', margin: 0 }}>deepika_iyyappan</h2>
                        <Button variant="contained" size="small" style={{ backgroundColor: '#efefef', color: 'black', textTransform: 'none', fontWeight: 'bold' }}>
                            Edit Profile
                        </Button>
                        <SettingsOutlinedIcon style={{ cursor: 'pointer' }} />
                    </div>

                    <div style={{ display: 'flex', gap: '30px', fontSize: '16px' }}>
                        <span><b>5</b> posts</span>
                        <span><b>120</b> followers</span>
                        <span><b>100</b> following</span>
                    </div>

                    <div>
                        <b style={{ display: 'block' }}>Deepika</b>
                        <span>MERN Stack Student <br/>Learning React! </span>
                    </div>
                </div>
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #efefef', marginBottom: '0' }}/>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '15px 0', borderTop: '1px solid black', cursor: 'pointer' }}>
                    <GridOnOutlinedIcon fontSize="small"/> <b style={{ fontSize: '12px' }}>POSTS</b>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '15px 0', color: 'gray', cursor: 'pointer' }}>
                    <BookmarkBorderOutlinedIcon fontSize="small"/> <b style={{ fontSize: '12px' }}>SAVED</b>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '5px' }}>
                {PROFILE_POSTS.map(post => (
                    <div key={post.id} style={{ aspectRatio: '1 / 1', overflow: 'hidden', cursor: 'pointer' }}>
                        <img 
                            src={post.image} 
                            alt="Post" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                        />
                    </div>
                ))}
            </div>

        </div>
    );
}

export default Profile;
