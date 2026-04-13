import React, { useState } from "react";
import { TextField, Button, Paper, Divider, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api";

// Signup Page Component
function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
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
      const { data } = await axios.post("/auth/register", formData);
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
        <h1 className="text-3xl font-bold tracking-tighter mb-6 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] bg-clip-text text-transparent">
          Sentigram
        </h1>

        <p className="text-[13px] font-bold text-gray-400 text-center mb-6 px-2">
          Sign up to see photos and videos from your friends.
        </p>

        {error && <Alert severity="error" className="w-full mb-4 !text-xs">{error}</Alert>}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            variant="outlined"
            required
            value={formData.email}
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
            required
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
            required
            value={formData.password}
            onChange={handleChange}
            className="!bg-gray-50/50"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 1 } }}
          />

          <p className="text-[10px] text-gray-400 text-center my-4">
            By signing up, you agree to our <span className="font-bold">Terms</span>, <span className="font-bold">Data Policy</span> and <span className="font-bold">Cookies Policy</span>.
          </p>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            className="!bg-pink-600 !py-1.5 !font-bold !normal-case !shadow-none !mt-2"
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
        </form>
      </Paper>

      <Paper elevation={0} className="w-full max-w-[350px] p-5 mt-3 border border-gray-200 bg-white text-center text-sm">
        <p className="text-gray-800">
          Have an account? <Link to="/login" className="text-pink-600 font-bold ml-1 hover:underline">Log in</Link>
        </p>
      </Paper>
    </div>
  );
}

export default Signup;


