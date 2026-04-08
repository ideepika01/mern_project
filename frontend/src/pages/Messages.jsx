import React from "react";
import { Avatar, IconButton, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

const CHAT_LIST = [
  { id: 1, name: "Sarah Designs", message: "Loved the new post! ✨", img: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg", active: true, time: "12m" },
  { id: 2, name: "David Tech", message: "Are we still meeting?", img: "https://img.freepik.com/free-photo/cascade-boat-clean-china-natural-rural_1417-1356.jpg", active: false, time: "1h" },
];

function Messages() {
  return (
    <div className="flex h-full w-full bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      {/* Search & List */}
      <div className="w-full md:w-[350px] border-r border-gray-100 flex flex-col">
        <header className="p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <IconButton size="small"><EditNoteIcon /></IconButton>
        </header>

        <SearchBar />

        <div className="flex-1 overflow-y-auto">
          {CHAT_LIST.map((chat) => (
            <ChatItem key={chat.id} chat={chat} />
          ))}
        </div>
      </div>

      {/* active Chat */}
      <ChatWindow chat={CHAT_LIST[0]} />
    </div>
  );
}

const SearchBar = () => (
  <div className="px-5 mb-4">
    <TextField
      placeholder="Search messages"
      variant="outlined"
      fullWidth
      size="small"
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
        className: "!rounded-xl !bg-gray-50 !border-none",
      }}
      sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
    />
  </div>
);

const ChatItem = ({ chat }) => (
  <div className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors ${chat.active ? "bg-gray-50" : "hover:bg-gray-50/50"}`}>
    <div className="relative">
      <Avatar src={chat.img} className="w-14 h-14" />
      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-bold text-gray-900 truncate">{chat.name}</span>
        <span className="text-[10px] text-gray-400 font-medium">{chat.time}</span>
      </div>
      <span className="text-xs text-gray-500 truncate mt-0.5">{chat.message}</span>
    </div>
  </div>
);

const ChatWindow = ({ chat }) => (
  <div className="hidden md:flex flex-1 flex-col bg-white">
    <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Avatar src={chat.img} className="w-8 h-8" />
        <div className="flex flex-col">
          <span className="text-sm font-bold text-gray-900">{chat.name}</span>
          <span className="text-[10px] text-green-500 font-bold uppercase">Active now</span>
        </div>
      </div>
      <div className="flex items-center gap-2 text-gray-500">
        <IconButton size="small"><PhoneOutlinedIcon fontSize="small" /></IconButton>
        <IconButton size="small"><VideocamOutlinedIcon fontSize="small" /></IconButton>
        <IconButton size="small"><InfoOutlinedIcon fontSize="small" /></IconButton>
      </div>
    </header>

    <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
      <Avatar src={chat.img} sx={{ width: 96, height: 96, mb: 2 }} />
      <h3 className="text-lg font-bold text-gray-900">{chat.name}</h3>
      <Button variant="outlined" size="small" className="!mt-4 !text-xs !border-gray-200">View Profile</Button>
    </div>

    <footer className="p-4 px-6 border-t border-gray-100">
      <div className="flex items-center gap-4 border border-gray-200 rounded-full py-1.5 pl-4 pr-1.5 focus-within:border-gray-300">
        <input type="text" placeholder="Message..." className="flex-1 bg-transparent border-none text-sm outline-none" />
        <div className="flex items-center gap-1">
          <IconButton size="small"><PhotoSizeSelectActualOutlinedIcon fontSize="small" /></IconButton>
          <IconButton size="small"><FavoriteBorderOutlinedIcon fontSize="small" /></IconButton>
          <Button size="small" className="!text-blue-500 !font-bold">Send</Button>
        </div>
      </div>
    </footer>
  </div>
);

export default Messages;
