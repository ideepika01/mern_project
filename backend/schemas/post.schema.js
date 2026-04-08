const Joi = require('joi');

const postSchema = Joi.object({
  caption: Joi.string().required().min(1).max(500),
  image: Joi.any(), // Multer handles this
});

module.exports = {
  postSchema,
};
