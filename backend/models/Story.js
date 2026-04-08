const mongoose = require('mongoose');

const storySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    image: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: () => new Date(+new Date() + 24 * 60 * 60 * 1000), // 24 hours from now
      index: { expires: '24h' } // TTL index
    }
  },
  {
    timestamps: true,
  }
);

const Story = mongoose.model('Story', storySchema);
module.exports = Story;
