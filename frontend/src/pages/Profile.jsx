import React from "react";
import { Avatar, Button, IconButton } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import GridOnOutlinedIcon from "@mui/icons-material/GridOnOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";

const POSTS = [
  { id: 1, img: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
  { id: 2, img: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
  { id: 3, img: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" },
];

function Profile() {
  return (
    <div className="w-full max-w-4xl mx-auto py-10 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-10 md:gap-20 mb-12">
        <ProfileAvatar />
        <div className="flex flex-col gap-6 flex-1">
          <ProfileInfo />
          <Stats />
          <Bio />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex justify-center gap-12">
          <Tab icon={<GridOnOutlinedIcon sx={{ fontSize: 16 }} />} label="Posts" active />
          <Tab icon={<BookmarkBorderOutlinedIcon sx={{ fontSize: 16 }} />} label="Saved" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 mt-2">
        {POSTS.map((post) => (
          <div key={post.id} className="aspect-square cursor-pointer overflow-hidden rounded-sm md:rounded-lg">
            <img src={post.img} alt="Post" className="w-full h-full object-cover hover:brightness-90 transition-all" />
          </div>
        ))}
      </div>
    </div>
  );
}

const ProfileAvatar = () => (
  <div className="p-1 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
    <div className="p-1 bg-white rounded-full">
      <Avatar src="https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg" className="w-32 h-32 md:w-36 md:h-36 border" />
    </div>
  </div>
);

const ProfileInfo = () => (
  <div className="flex flex-wrap items-center gap-4">
    <h2 className="text-xl font-semibold text-gray-800">deepika_iyyappan</h2>
    <div className="flex gap-2">
      <Button variant="outlined" size="small" className="!text-black !border-gray-300">Edit Profile</Button>
      <Button variant="outlined" size="small" className="!text-black !border-gray-300">View Archive</Button>
    </div>
    <IconButton size="small"><SettingsOutlinedIcon /></IconButton>
  </div>
);

const Stats = () => (
  <div className="flex gap-8 text-sm md:text-base">
    <span><strong>5</strong> posts</span>
    <span><strong>120</strong> followers</span>
    <span><strong>100</strong> following</span>
  </div>
);

const Bio = () => (
  <div className="flex flex-col gap-1">
    <h1 className="text-sm font-bold">Deepika Iyyappan</h1>
    <p className="text-sm text-gray-700">MERN Student 💻 | Learning React 🚀 | Coffee Lover ☕</p>
  </div>
);

const Tab = ({ icon, label, active }) => (
  <div className={`flex items-center gap-1.5 py-4 border-t ${active ? 'border-black text-gray-900' : 'border-transparent text-gray-400'} cursor-pointer text-xs font-bold uppercase tracking-widest`}>
    {icon}
    <span>{label}</span>
  </div>
);

export default Profile;
