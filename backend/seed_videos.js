const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');
require('dotenv').config();

const VIDEO_POSTS = [
  {
    caption: "Amazing city vibes 🏙️",
    image: "https://videos.pexels.com/video-files/4434242/4434242-uhd_2560_1440_24fps.mp4"
  },
  {
    caption: "Nature is peaceful 🌿",
    image: "https://videos.pexels.com/video-files/4122044/4122044-uhd_2560_1440_25fps.mp4"
  },
  {
    caption: "Sunsets are life 🌅",
    image: "https://videos.pexels.com/video-files/5896379/5896379-uhd_2560_1440_24fps.mp4"
  }
];

const seedVideos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const user = await User.findOne();
    if (!user) {
      console.log('User not found. Run seed.js first.');
      process.exit();
    }

    const posts = VIDEO_POSTS.map(v => ({
      user: user._id,
      image: v.image,
      caption: v.caption,
      likes: [],
      comments: []
    }));

    await Post.insertMany(posts);
    console.log('Added 3 sample video posts!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedVideos();
