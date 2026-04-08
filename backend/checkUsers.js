const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const check = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find({}, 'username');
    console.log('Users found:', users.map(u => u.username));
    process.exit();
};
check();
