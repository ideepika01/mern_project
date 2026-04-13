import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { SettingsOutlined as SettingsIcon, GridOnOutlined as GridIcon, BookmarkBorderOutlined as BookmarkIcon, Close as CloseIcon } from "@mui/icons-material";
import Post from "../components/Post";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile, updateProfile as apiUpdate, followUser as apiFollow, startConversation } from "../api";

const Tab = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-2 py-4 border-t ${active ? 'border-black text-black' : 'border-transparent text-gray-400'} cursor-pointer text-xs font-bold uppercase tracking-widest`}>{icon} {label}</div>
);

function Profile() {
  const { username } = useParams(), navigate = useNavigate();
  const [user, setUser] = useState(null), [posts, setPosts] = useState([]), [viewIndex, setViewIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("posts"), [isFollowing, setIsFollowing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false), [editBio, setEditBio] = useState(''), [editUsername, setEditUsername] = useState(''), [editPic, setEditPic] = useState('');

  const currentAuthUser = JSON.parse(localStorage.getItem('profile'))?.user;
  const currentUsername = username || currentAuthUser?.username;

  const getProfile = () => {
    fetchUserProfile(currentUsername).then(({ data }) => {
      setUser(data.user); setPosts(data.posts); setEditBio(data.user.bio || ''); setEditUsername(data.user.username); setEditPic(data.user.profilePic || '');
      setIsFollowing(data.user.followers?.includes(currentAuthUser.id));
    }).catch(console.error);
  };

  useEffect(() => { 
    if (!username && currentAuthUser?.username) {
        navigate(`/profile/${currentAuthUser.username}`, { replace: true });
        return;
    }
    getProfile(); 
  }, [username, currentUsername]);

  const handleFollow = () => {
    apiFollow(user._id).then(({ data }) => {
      setIsFollowing(data.isFollowing);
      setUser({...user, followers: data.isFollowing ? [...user.followers, currentAuthUser.id] : user.followers.filter(id => id !== currentAuthUser.id)});
    }).catch(console.error);
  };

  const handleMessage = () => {
    startConversation(user._id).then(() => navigate('/messages')).catch(console.error);
  };

  const handleUpdate = () => {
    apiUpdate({ bio: editBio, username: editUsername, profilePic: editPic }).then(({ data }) => {
      setOpenEdit(false);
      const profile = JSON.parse(localStorage.getItem('profile'));
      profile.user = { ...profile.user, username: data.username, bio: data.bio, profilePic: data.profilePic };
      localStorage.setItem('profile', JSON.stringify(profile));
      getProfile(); if (editUsername !== user.username) navigate(`/profile/${editUsername}`);
      window.location.reload(); // Hard refresh to update Navbar/Sidebar
    }).catch(e => alert(e.message));
  };

  if (!user) return <div className="p-10 text-center">Loading...</div>;

  const displayedPosts = activeTab === "posts" ? posts : user.saved || [], isOwn = user.username === currentAuthUser?.username;

  return (
    <div className="w-full max-w-4xl mx-auto py-4 md:py-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-20 mb-8 px-4">
        <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"><div className="p-0.5 bg-white rounded-full"><Avatar src={user.profilePic} className="w-20 h-20 md:w-36 md:h-36 border" /></div></div>
        <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <h2 className="text-xl">{user.username}</h2>
            {isOwn ? <Button onClick={() => setOpenEdit(true)} size="small" className="!bg-[#efefef] !text-black !rounded-lg !px-4 !font-bold">Edit Profile</Button> : 
              <div className="flex gap-2">
                <Button onClick={handleFollow} size="small" className={`!rounded-lg !px-6 !font-bold ${isFollowing ? '!bg-gray-200 !text-black' : '!bg-blue-500 !text-white'}`}>{isFollowing ? 'Following' : 'Follow'}</Button>
                <Button onClick={handleMessage} size="small" className="!bg-[#efefef] !text-black !rounded-lg !px-4 !font-bold">Message</Button>
              </div>}
            <IconButton size="small"><SettingsIcon /></IconButton>
          </div>
          <div className="flex justify-center md:justify-start gap-8 text-sm"><span><strong>{posts.length}</strong> posts</span><span><strong>{user.followers?.length || 0}</strong> followers</span><span><strong>{user.following?.length || 0}</strong> following</span></div>
          <div className="text-sm"><strong>{user.username}</strong><p className="text-gray-700">{user.bio || "No bio yet."}</p></div>
        </div>
      </div>

      <div className="border-t flex justify-center gap-12"><Tab icon={<GridIcon sx={{fontSize:16}}/>} label="Posts" active={activeTab==="posts"} onClick={()=>setActiveTab("posts")}/>{isOwn && <Tab icon={<BookmarkIcon sx={{fontSize:16}}/>} label="Saved" active={activeTab==="saved"} onClick={()=>setActiveTab("saved")}/>}</div>
      <div className="grid grid-cols-3 gap-0.5 md:gap-6 mt-1">{displayedPosts.map((p, i) => (
          <div key={p._id} onClick={() => setViewIndex(i)} className="relative aspect-square cursor-pointer overflow-hidden rounded-none md:rounded-lg"><img src={p.image?.startsWith('http') ? p.image : `http://localhost:5001${p.image}`} className="w-full h-full object-cover" /></div>
        ))}</div>

      {viewIndex !== null && <div className="fixed inset-0 z-[100] bg-white md:bg-black/95 flex flex-col items-center overflow-y-auto"><div className="sticky top-0 w-full flex justify-between items-center p-4 bg-white md:bg-transparent z-10"><IconButton onClick={() => setViewIndex(null)}><CloseIcon className="md:text-white" /></IconButton></div><div className="w-full max-w-[500px] flex flex-col pb-20"><Post post={displayedPosts[viewIndex]} /></div></div>}

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs"><DialogTitle className="text-center font-bold">Edit Profile</DialogTitle><DialogContent className="flex flex-col gap-4 pt-2"><TextField label="Username" fullWidth size="small" value={editUsername} onChange={e => setEditUsername(e.target.value)} /><TextField label="Profile Pic URL" fullWidth size="small" value={editPic} onChange={e => setEditPic(e.target.value)} /><TextField label="Bio" fullWidth multiline rows={3} size="small" value={editBio} onChange={e => setEditBio(e.target.value)} /></DialogContent><DialogActions className="p-4"><Button onClick={() => setOpenEdit(false)}>Cancel</Button><Button onClick={handleUpdate} variant="contained" className="!bg-blue-500">Save</Button></DialogActions></Dialog>
    </div>
  );
}

export default Profile;
