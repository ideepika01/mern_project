const Story = require('../models/Story');

const getStories = async (req, res) => {
  try {
    const stories = await Story.find().populate('user', 'username profilePic');
    res.json(stories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createStory = async (req, res) => {
  try {
    const image = req.file ? `/uploads/${req.file.filename}` : req.body.image;
    const story = await Story.create({
      user: req.user.id,
      image,
    });
    
    const populatedStory = await story.populate('user', 'username profilePic');
    res.status(201).json(populatedStory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getStories,
  createStory,
};
