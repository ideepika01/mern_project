import React, { useEffect, useState } from "react";
import { Avatar, TextField, InputAdornment } from "@mui/material";
import { Search as SearchIcon, Favorite as FavoriteIcon, ChatBubble as ChatBubbleIcon, Close as CloseIcon } from "@mui/icons-material";
import Post from "../components/Post";
import { fetchExplorePosts, searchUsers } from "../api";
import { useNavigate } from "react-router-dom";

function Explore() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]), [loading, setLoading] = useState(true), [viewIndex, setViewIndex] = useState(null);
  const [query, setQuery] = useState(""), [results, setResults] = useState([]);

  useEffect(() => { fetchExplorePosts().then(r => setPosts(r.data)).catch(console.error).finally(() => setLoading(false)); }, []);
  useEffect(() => {
    const t = setTimeout(() => { if (query.length > 1) searchUsers(query).then(r => setResults(r.data)).catch(console.error); else setResults([]); }, 300);
    return () => clearTimeout(t);
  }, [query]);

  return (
    <div className="w-full relative px-2">
      <div className="max-w-xl mx-auto mb-8 relative">
        <TextField fullWidth size="small" placeholder="Search people..." value={query} onChange={e => setQuery(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>, className: "!rounded-xl !bg-gray-100 !border-none" }}
          sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }} />
        {results.length > 0 && <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-2xl z-[60] max-h-80 overflow-y-auto">
          {results.map(u => (
            <div key={u._id} onClick={() => navigate(`/profile/${u.username}`)} className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer border-b last:border-none">
              <Avatar src={u.profilePic} className="w-10 h-10" /><div className="flex flex-col"><span className="text-sm font-bold">{u.username}</span><span className="text-xs text-gray-400 truncate">{u.bio || "No bio"}</span></div>
            </div>
          ))}
        </div>}
      </div>

      {loading ? <p className="text-center py-20 text-gray-400">Loading...</p> : (
        <div className="grid grid-cols-3 gap-0.5 md:gap-6">
          {posts.map((p, i) => (
            <div key={p._id} onClick={() => setViewIndex(i)} className="relative aspect-square group cursor-pointer overflow-hidden rounded-none md:rounded-xl">
              <img src={p.image?.startsWith('http') ? p.image : `http://localhost:5001${p.image}`} className="w-full h-full object-cover group-hover:scale-110 transition-all" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-bold">
                <div className="flex items-center gap-1"><FavoriteIcon /><span>{p.likes?.length || 0}</span></div>
                <div className="flex items-center gap-1"><ChatBubbleIcon /><span>{p.comments?.length || 0}</span></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-white md:bg-black/95 flex flex-col items-center overflow-y-auto">
          <div className="sticky top-0 w-full flex justify-between items-center p-4 bg-white md:bg-transparent z-10">
             <div className="flex-1"></div>
             <button onClick={() => setViewIndex(null)} className="p-2 rounded-full md:text-white bg-gray-100 md:bg-white/10 hover:bg-gray-200"><CloseIcon /></button>
          </div>
          <div className="w-full max-w-[500px] flex flex-col gap-8 pb-20 pt-2 md:pt-10">
            <div className="w-full bg-white rounded-none md:rounded-2xl">
              <Post post={posts[viewIndex]} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Explore;

