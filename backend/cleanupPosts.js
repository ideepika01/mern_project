const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Post = require('./models/Post');

dotenv.config();

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const user = await User.findOne({ username: 'Deepika' });
    if (!user) {
      console.log('User deepika not found');
      process.exit();
    }

    const res = await Post.deleteMany({ user: user._id });
    console.log(`Deleted ${res.deletedCount} posts for deepika`);
    
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

cleanup();
