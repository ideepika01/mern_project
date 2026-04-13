const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// Register user
const register = async ({ username, email, password }) => {
  
  const userExists = await User.findOne({
    $or: [{ email }, { username }]
  });
  if (userExists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  });

  return generateToken(user._id);
};

// Login user
const login = async (email, password) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  // Return token + user data
  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic
    }
  };
};

module.exports = { register, login };