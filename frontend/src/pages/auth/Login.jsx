import React, { useState } from "react";
import { TextField, Button, Paper, Divider, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import FacebookIcon from '@mui/icons-material/Facebook';
import axios from "../../api";

// Login Page Component
function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post("/auth/login", formData);
      localStorage.setItem("profile", JSON.stringify(data));
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 p-4">
      <Paper elevation={0} className="w-full max-w-[350px] p-8 border border-gray-200 bg-white flex flex-col items-center">
        {/* Logo */}
        <h1 className="text-3xl font-bold tracking-tighter mb-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text text-transparent">
          Sentigram
        </h1>
        
        {error && <Alert severity="error" className="w-full mb-4 !text-xs">{error}</Alert>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            required
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            required
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="!bg-pink-600 !py-1.5 !font-bold !normal-case !shadow-none !mt-4"
          >
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <div className="flex items-center gap-4 my-4">
            <Divider className="flex-1" />
            <span className="text-xs font-bold text-gray-400">OR</span>
            <Divider className="flex-1" />
          </div>

          <button type="button" className="flex items-center justify-center gap-2 text-sm font-bold text-blue-900 hover:text-blue-800 transition-colors">
            <FacebookIcon fontSize="small" />
            Log in with Facebook
          </button>

          <a href="#" className="text-[12px] text-blue-900 text-center mt-4 active:opacity-70">
            Forgot password?
          </a>
        </form>
      </Paper>

      <Paper elevation={0} className="w-full max-w-[350px] p-5 mt-3 border border-gray-200 bg-white text-center text-sm">
        <p className="text-gray-800">
          Don't have an account? <Link to="/signup" className="text-pink-600 font-bold ml-1 hover:underline">Sign up</Link>
        </p>
      </Paper>
    </div>
  );
}

export default Login;


