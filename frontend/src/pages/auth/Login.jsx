import React from "react";
import { TextField, Button, Paper, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 p-4">
      <Paper elevation={0} className="w-full max-w-[350px] p-8 border border-gray-200 bg-white flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tighter mb-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text text-transparent">
          Sentigram
        </h1>
        
        <div className="w-full flex flex-col gap-2">
          <TextField
            fullWidth
            size="small"
            label="Phone number, username, or email"
            variant="outlined"
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            variant="outlined"
            type="password"
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />

          <Button
            variant="contained"
            fullWidth
            className="!bg-pink-600 !py-1.5 !font-bold !normal-case !shadow-none !mt-4"
          >
            Log In
          </Button>

          <div className="flex items-center gap-4 my-4">
            <Divider className="flex-1" />
            <span className="text-xs font-bold text-gray-400">OR</span>
            <Divider className="flex-1" />
          </div>

          <button className="flex items-center justify-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-800 transition-colors">
            <FacebookIcon fontSize="small" />
            Log in with Facebook
          </button>

          <a href="#" className="text-[12px] text-blue-900 text-center mt-4 active:opacity-70">
            Forgot password?
          </a>
        </div>
      </Paper>

      <Paper elevation={0} className="w-full max-w-[350px] p-5 mt-3 border border-gray-200 bg-white text-center text-sm">
        <p className="text-gray-800">
          Don't have an account? <Link to="/signup" className="text-pink-600 font-bold ml-1 hover:underline">Sign up</Link>
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

export default Login;

