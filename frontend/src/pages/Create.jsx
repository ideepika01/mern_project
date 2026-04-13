import React, { useState, useRef } from "react";
import { Button, TextField, Avatar, Divider } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import axios from "../api";
import { useNavigate } from "react-router-dom";

function Create() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("profile"))?.user;

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file)); // Generate preview URL
  };

  const handleShare = async () => {
    // Prevent empty post submission
    if (!image || !caption) {
      alert("Please select an image and write a caption");
      return;
    }

    setLoading(true);

    const formData = new FormData(); // Prepare multipart data for upload
    formData.append("image", image);
    formData.append("caption", caption);

    try {
      await axios.post("/posts", formData);
      navigate("/home"); // Redirect after successful post
    } catch (err) {
      console.error(err);
      alert("Failed to create post. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-full max-w-lg bg-white border rounded-3xl shadow-xl overflow-hidden flex flex-col">

        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold mx-auto pl-8">Create New Post</h2>
          <Button
            size="small"
            className="!font-bold !text-blue-500"
            onClick={handleShare}
            disabled={loading}
          >
            {loading ? "Sharing..." : "Share"}
          </Button>
        </header>

        {/* Hidden file input triggered by click */}
        <input
          type="file"
          hidden
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/*"
        />

        <div
          className="aspect-[4/3] bg-gray-50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-100"
          onClick={() => fileInputRef.current.click()}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <>
              <AddPhotoAlternateIcon sx={{ fontSize: 48 }} className="text-gray-400" />
              <p className="text-sm text-gray-600">Select photos</p>
            </>
          )}
        </div>

        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.profilePic || "https://mui.com/static/images/avatar/1.jpg"}
            />
            <span className="text-sm font-bold">
              {user?.username || "user"}
            </span>
          </div>

          <TextField
            multiline
            rows={4}
            placeholder="Write a caption..."
            variant="outlined"
            fullWidth
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": { border: "none" },
              "& .MuiOutlinedInput-root": { padding: 0 },
            }}
          />

          <Divider />
        </div>
      </div>
    </div>
  );
}

export default Create;