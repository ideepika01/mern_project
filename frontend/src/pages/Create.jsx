import React, { useState, useRef } from "react";
import { Button, TextField, Avatar, Divider } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

function Create() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleShare = async () => {
    if (!image || !caption) {
      alert("Please select an image and write a caption");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await createPost(formData);
      navigate("/home");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900 mx-auto pl-8">Create New Post</h2>
          <Button 
            size="small" 
            className="!font-bold !text-blue-500" 
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? "Sharing..." : "Share"}
          </Button>
        </header>

        {/* Upload Area */}
        <input 
          type="file" 
          hidden 
          ref={fileInputRef} 
          onChange={handleFileSelect}
          accept="image/*"
        />
        <div 
          className="aspect-[4/3] bg-gray-50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors group"
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <div className="p-6 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform">
                <AddPhotoAlternateIcon sx={{ fontSize: 48 }} className="text-gray-400 group-hover:text-blue-400" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="text-lg font-medium text-gray-800">Select photos from computer</p>
                <p className="text-xs text-gray-500">Only images are allowed</p>
              </div>
            </>
          )}
        </div>

        {/* Post Composition */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Avatar src={JSON.parse(localStorage.getItem('profile'))?.user?.profilePic || "https://mui.com/static/images/avatar/1.jpg"} className="w-8 h-8" />
            <span className="text-sm font-bold text-gray-800">{JSON.parse(localStorage.getItem('profile'))?.user?.username || "user"}</span>
          </div>
          
          <TextField
            multiline
            rows={4}
            placeholder="Write a caption..."
            variant="outlined"
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" }, "& .MuiOutlinedInput-root": { padding: 0 } }}
            inputProps={{ className: "!text-sm" }}
          />

          <Divider />
        </div>
      </div>
    </div>
  );
}

export default Create;

