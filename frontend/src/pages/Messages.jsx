import React, { useEffect, useState } from "react";
import { Avatar, IconButton, TextField, InputAdornment, Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import EditNoteIcon from '@mui/icons-material/EditNote';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";
import { fetchConversations, fetchMessages, sendMessage as apiSendMessage, searchUsers } from "../api";

const SOCKET_URL = "http://localhost:5001";

function Messages() {
  const location = useLocation();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const currentUser = JSON.parse(localStorage.getItem('profile'))?.user;
  const currentUserId = currentUser?.id;

  useEffect(() => {
    const s = io(SOCKET_URL);
    s.emit("addUser", currentUserId);
    s.on("getMessage", data => setArrivalMessage({ sender: data.senderId, receiver: data.receiverId, message: data.text, createdAt: Date.now() }));
    return () => s.disconnect();
  }, [currentUserId]);

  useEffect(() => {
    if (arrivalMessage && activeChat?._id === arrivalMessage.sender) setMessages(p => [...p, arrivalMessage]);
  }, [arrivalMessage, activeChat]);

  const loadData = async () => {
    try {
      const { data } = await fetchConversations(currentUserId);
      const incoming = location.state?.selectedUser;
      if (incoming) {
        setConversations(data.find(c => c._id === incoming._id) ? data : [incoming, ...data]);
        setActiveChat(incoming);
      } else {
        setConversations(data);
        if (data.length > 0) setActiveChat(data[0]);
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  useEffect(() => { if (currentUserId) loadData(); }, [currentUserId]);

  useEffect(() => {
    if (activeChat) fetchMessages(currentUserId, activeChat._id).then(r => setMessages(r.data)).catch(console.error);
  }, [activeChat, currentUserId]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length > 1) setSearchResults((await searchUsers(searchQuery)).data);
      else setSearchResults([]);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    try {
      const { data } = await apiSendMessage({ sender: currentUserId, receiver: activeChat._id, message: inputText });
      setMessages([...messages, data]);
      setInputText("");
    } catch (e) { console.error(e); }
  };

  return (
    <div className="flex h-[80vh] w-full bg-white border border-gray-100 md:rounded-2xl overflow-hidden shadow-sm">
      <div className={`${activeChat && 'hidden md:flex'} w-full md:w-[350px] border-r border-gray-100 flex flex-col`}>
        <header className="p-5 flex items-center justify-between">
          <h2 className="text-xl font-bold">Messages</h2>
          <IconButton size="small"><EditNoteIcon /></IconButton>
        </header>
        
        <div className="px-5 mb-4 relative">
          <TextField placeholder="Search people" fullWidth size="small" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>, className: "!rounded-xl !bg-gray-50 !border-none" }}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }} />
          {searchResults.length > 0 && <div className="absolute top-full left-5 right-5 mt-1 bg-white border border-gray-100 rounded-xl shadow-xl z-20 max-h-60 overflow-y-auto">
            {searchResults.map(u => (
              <div key={u._id} onClick={() => { setActiveChat(u); setSearchQuery(""); setSearchResults([]); if (!conversations.find(c => c._id === u._id)) setConversations([u, ...conversations]); }}
                className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b last:border-none">
                <Avatar src={u.profilePic} className="w-10 h-10" />
                <div className="flex flex-col"><span className="text-sm font-bold">{u.username}</span><span className="text-xs text-gray-500 truncate">{u.bio || 'Available'}</span></div>
              </div>
            ))}
          </div>}
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? <p className="p-5 text-sm">Loading...</p> : conversations.map(c => (
            <div key={c._id} className={`flex items-center gap-4 px-5 py-4 cursor-pointer ${activeChat?._id === c._id ? "bg-gray-50" : "hover:bg-gray-50/50"}`} onClick={() => setActiveChat(c)}>
              <div className="relative"><Avatar src={c.profilePic} className="w-14 h-14" /><div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div></div>
              <span className="text-sm font-bold truncate">{c.username}</span>
            </div>
          ))}
        </div>
      </div>

      {activeChat ? <div className="flex flex-1 flex-col bg-white">
        <header className="h-16 px-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IconButton className="md:hidden !p-0 mr-2" onClick={() => setActiveChat(null)}><SearchIcon className="rotate-90" /></IconButton>
            <Avatar src={activeChat.profilePic} className="w-8 h-8" />
            <div className="flex flex-col"><span className="text-sm font-bold">{activeChat.username}</span><span className="text-[10px] text-green-500 font-bold uppercase">Active now</span></div>
          </div>
          <div className="flex items-center gap-2 text-gray-400">
            <IconButton size="small"><PhoneOutlinedIcon fontSize="small" /></IconButton>
            <IconButton size="small"><VideocamOutlinedIcon fontSize="small" /></IconButton>
            <IconButton size="small"><InfoOutlinedIcon fontSize="small" /></IconButton>
          </div>
        </header>
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 modern-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[70%] p-3 rounded-2xl text-sm ${m.sender === currentUserId ? "bg-blue-500 text-white self-end rounded-tr-none" : "bg-gray-100 text-gray-800 self-start rounded-tl-none"}`}>
              {m.message || m.text}
            </div>
          ))}
        </div>
        <footer className="p-4 px-6 border-t border-gray-100 flex items-center gap-4">
          <div className="flex-1 flex gap-4 border rounded-full py-1.5 px-4"><input className="flex-1 bg-transparent border-none text-sm outline-none" placeholder="Message..." value={inputText} onChange={e => setInputText(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} /></div>
          <Button size="small" className="!text-blue-500 !font-bold" onClick={handleSend}>Send</Button>
        </footer>
      </div> : <div className="hidden md:flex flex-1 flex-col items-center justify-center text-gray-500">
          <div className="p-5 rounded-full border-2 border-gray-200 mb-4"><ChatBubbleIcon /></div>
          <p className="text-xl font-bold text-gray-900">Your Messages</p>
          <p className="text-sm">Send private photos and messages to a friend.</p>
          <Button variant="contained" className="!mt-4 !bg-blue-500 !rounded-lg" onClick={() => document.querySelector('input[placeholder="Search people"]').focus()}>Send Message</Button>
      </div>}
    </div>
  );
}

export default Messages;

