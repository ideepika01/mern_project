import React, { useEffect, useState } from "react";
import { Avatar, Button, IconButton, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { SettingsOutlined as SettingsIcon, GridOnOutlined as GridIcon, BookmarkBorderOutlined as BookmarkIcon, PlayCircle as PlayIcon, Close as CloseIcon } from "@mui/icons-material";
import Post from "../components/Post";
import { useParams, useNavigate } from "react-router-dom";
import { fetchUserProfile, updateProfile as apiUpdate, followUser as apiFollow } from "../api";

const Tab = ({ icon, label, active, onClick }) => (
  <div onClick={onClick} className={`flex items-center gap-2 py-4 border-t ${active ? 'border-black text-black' : 'border-transparent text-gray-400'} cursor-pointer text-xs font-bold uppercase tracking-widest`}>
    {icon} <span>{label}</span>
  </div>
);

function Profile() {
  const { username } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null), [posts, setPosts] = useState([]), [loading, setLoading] = useState(true);
  const [viewIndex, setViewIndex] = useState(null), [activeTab, setActiveTab] = useState("posts"), [isFollowing, setIsFollowing] = useState(false);
  const [openEdit, setOpenEdit] = useState(false), [editBio, setEditBio] = useState(''), [editUsername, setEditUsername] = useState('');

  const currentAuthUser = JSON.parse(localStorage.getItem('profile'))?.user;
  const currentUsername = username || currentAuthUser?.username;

  const getProfile = async () => {
    try {
      const { data } = await fetchUserProfile(currentUsername);
      setUser(data.user); setPosts(data.posts); setEditBio(data.user.bio || ''); setEditUsername(data.user.username);
      setIsFollowing(data.user.followers?.includes(currentAuthUser.id));
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { getProfile(); }, [currentUsername]);

  const handleFollow = async () => {
    try {
      const { data } = await apiFollow(user._id);
      setIsFollowing(data.isFollowing);
      setUser({...user, followers: data.isFollowing ? [...user.followers, currentAuthUser.id] : user.followers.filter(id => id !== currentAuthUser.id)});
    } catch (e) { console.error(e); }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await apiUpdate({ bio: editBio, username: editUsername });
      setOpenEdit(false);
      const profile = JSON.parse(localStorage.getItem('profile'));
      if (profile?.user) { profile.user.username = data.username; profile.user.bio = data.bio; localStorage.setItem('profile', JSON.stringify(profile)); }
      getProfile(); if (editUsername !== user.username) navigate(`/profile/${editUsername}`);
    } catch (e) { alert(e.message); }
  };

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user) return <div className="p-10 text-center">User not found</div>;

  const displayedPosts = activeTab === "posts" ? posts : user.saved || [];
  const isOwn = user.username === currentAuthUser?.username;

  return (
    <div className="w-full max-w-4xl mx-auto py-4 md:py-10">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-20 mb-8 px-4">
        <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600"><div className="p-0.5 bg-white rounded-full"><Avatar src={user.profilePic} className="w-20 h-20 md:w-36 md:h-36 border" /></div></div>
        <div className="flex flex-col gap-4 flex-1 text-center md:text-left">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <h2 className="text-xl font-base text-gray-800">{user.username}</h2>
            {isOwn ? <Button onClick={() => setOpenEdit(true)} variant="outlined" size="small" className="!bg-[#efefef] !text-black !border-none !rounded-lg !px-4 !font-bold">Edit Profile</Button> : 
              <div className="flex gap-2">
                <Button onClick={handleFollow} variant="contained" size="small" className={`!border-none !rounded-lg !px-6 !font-bold ${isFollowing ? '!bg-gray-200 !text-black' : '!bg-blue-500 !text-white'}`}>{isFollowing ? 'Following' : 'Follow'}</Button>
                <Button onClick={() => navigate('/messages', { state: { selectedUser: user } })} variant="outlined" size="small" className="!bg-[#efefef] !text-black !border-none !rounded-lg !px-4 !font-bold">Message</Button>
              </div>}
            <IconButton size="small"><SettingsIcon /></IconButton>
          </div>
          <div className="flex justify-center md:justify-start gap-8 text-sm"><span className="flex gap-1"><strong>{posts.length}</strong> posts</span><span className="flex gap-1"><strong>{user.followers?.length || 0}</strong> followers</span><span className="flex gap-1"><strong>{user.following?.length || 0}</strong> following</span></div>
          <div className="text-sm"><strong>{user.username}</strong><p className="text-gray-700">{user.bio || "No bio yet."}</p></div>
        </div>
      </div>

      <div className="border-t border-gray-200 flex justify-center gap-12"><Tab icon={<GridIcon sx={{fontSize:16}}/>} label="Posts" active={activeTab==="posts"} onClick={()=>setActiveTab("posts")}/>{isOwn && <Tab icon={<BookmarkIcon sx={{fontSize:16}}/>} label="Saved" active={activeTab==="saved"} onClick={()=>setActiveTab("saved")}/>}</div>
      <div className="grid grid-cols-3 gap-0.5 md:gap-6 mt-1">{displayedPosts.length > 0 ? displayedPosts.map((p, i) => (
          <div key={p._id} onClick={() => setViewIndex(i)} className="relative aspect-square cursor-pointer overflow-hidden rounded-none md:rounded-lg group">
            <img src={p.image?.startsWith('http') ? p.image : `http://localhost:5001${p.image}`} className="w-full h-full object-cover group-hover:brightness-90 transition-all" />
            {p.image?.match(/\.(mp4|mov|webm)$/i) && <PlayIcon className="absolute top-2 right-2 text-white drop-shadow-md" />}
          </div>
        )) : <div className="col-span-3 py-20 text-center text-gray-400">{activeTab === "saved" ? "No saved posts." : "No posts."}</div>}
      </div>

      {viewIndex !== null && <div className="fixed inset-0 z-[100] bg-white md:bg-black/95 flex flex-col items-center overflow-y-auto"><div className="sticky top-0 w-full flex justify-between items-center p-4 bg-white md:bg-transparent z-10"><div className="flex items-center gap-2" onClick={() => setViewIndex(null)}><CloseIcon className="md:text-white pointer" /><h2 className="text-lg font-bold md:text-white">{activeTab==="saved"?"Saved":"Posts"}</h2></div></div><div className="w-full max-w-[500px] flex flex-col gap-8 pb-20">{displayedPosts.slice(viewIndex).map(p => <div key={p._id} className="bg-white md:rounded-2xl overflow-hidden"><Post post={p} /></div>)}</div></div>}

      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="xs"><DialogTitle className="text-center font-bold">Edit Profile</DialogTitle><DialogContent className="flex flex-col gap-4 pt-2"><TextField label="Username" fullWidth size="small" value={editUsername} onChange={e => setEditUsername(e.target.value)} /><TextField label="Bio" fullWidth multiline rows={3} size="small" value={editBio} onChange={e => setEditBio(e.target.value)} /></DialogContent><DialogActions className="p-4"><Button onClick={() => setOpenEdit(false)}>Cancel</Button><Button onClick={handleUpdate} variant="contained" className="!bg-blue-500 !rounded-lg">Save</Button></DialogActions></Dialog>
    </div>
  );
}

export default Profile;
