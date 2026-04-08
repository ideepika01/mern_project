import React, { useState } from "react";
import { TextField, Button, Paper, Divider } from "@mui/material";
import { Link } from "react-router-dom";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(formData);
    // Add signup logic here
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 p-4">
      <Paper elevation={0} className="w-full max-w-[350px] p-8 border border-gray-200 bg-white flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tighter mb-6 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text text-transparent">
          Sentigram
        </h1>
        
        <p className="text-[13px] font-bold text-gray-400 text-center mb-6 px-2">
          Sign up to see photos and videos from your friends.
        </p>

        <div className="w-full flex flex-col gap-2">
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            variant="outlined"
            value={formData.email}
            onChange={handleChange}
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />
          <TextField
            fullWidth
            size="small"
            label="Full Name"
            name="fullName"
            variant="outlined"
            value={formData.fullName}
            onChange={handleChange}
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />
          <TextField
            fullWidth
            size="small"
            label="Username"
            name="username"
            variant="outlined"
            value={formData.username}
            onChange={handleChange}
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            variant="outlined"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />

          <p className="text-[10px] text-gray-400 text-center my-4">
            By signing up, you agree to our <span className="font-bold">Terms</span>, <span className="font-bold">Data Policy</span> and <span className="font-bold">Cookies Policy</span>.
          </p>

          <Button
            variant="contained"
            fullWidth
            onClick={handleSubmit}
            className="!bg-pink-600 !py-1.5 !font-bold !normal-case !shadow-none !mt-2"
          >
            Sign Up
          </Button>
        </div>
      </Paper>

      <Paper elevation={0} className="w-full max-w-[350px] p-5 mt-3 border border-gray-200 bg-white text-center text-sm">
        <p className="text-gray-800">
          Have an account? <Link to="/login" className="text-pink-600 font-bold ml-1 hover:underline">Log in</Link>
        </p>
      </Paper>

      <div className="mt-5 flex flex-col items-center gap-4">
        <p className="text-sm text-gray-800">Get the app.</p>
        <div className="flex gap-2 h-10">
          <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Play Store" className="h-full cursor-pointer" />
          <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-full cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default Signup;

