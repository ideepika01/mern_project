import React from "react";
import { Button, TextField, Avatar, Divider, IconButton } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function Create() {
  return (
    <div className="flex justify-center items-center py-4">
      <div className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-bold text-gray-900 mx-auto pl-8">Create New Post</h2>
          <Button size="small" className="!font-bold !text-blue-500">Share</Button>
        </header>

        {/* Upload Area */}
        <div className="aspect-[4/3] bg-gray-50 flex flex-col items-center justify-center gap-4 cursor-pointer hover:bg-gray-100 transition-colors group">
          <div className="p-6 rounded-full bg-white shadow-sm group-hover:scale-110 transition-transform">
            <AddPhotoAlternateIcon sx={{ fontSize: 48 }} className="text-gray-400 group-hover:text-blue-400" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-lg font-medium text-gray-800">Drag photos and videos here</p>
            <p className="text-xs text-gray-500">Select from computer</p>
          </div>
          <Button variant="contained" className="!bg-blue-600 !rounded-xl !mt-2 !px-6 !py-2 !text-sm">
            Select From Computer
          </Button>
        </div>

        {/* Post Composition */}
        <div className="p-6 flex flex-col gap-5">
          <div className="flex items-center gap-3">
            <Avatar src="https://mui.com/static/images/avatar/1.jpg" className="w-8 h-8" />
            <span className="text-sm font-bold text-gray-800">deepika_iyyappan</span>
          </div>
          
          <TextField
            multiline
            rows={4}
            placeholder="Write a caption..."
            variant="outlined"
            fullWidth
            sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" }, "& .MuiOutlinedInput-root": { padding: 0 } }}
            inputProps={{ className: "!text-sm" }}
          />

          <Divider />
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>Location</span>
            <span className="text-xs font-bold text-blue-500 cursor-pointer">Add Location</span>
          </div>
          <Divider />
        </div>
      </div>
    </div>
  );
}

export default Create;
