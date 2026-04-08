const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (userData) => {
  const { username, email, password } = userData;
  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) throw new Error('User already exists');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return generateToken(user._id);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  return {
    token: generateToken(user._id),
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
    },
  };
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
  register,
  login,
};
