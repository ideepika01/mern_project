const Joi = require('joi');

const profileSchema = Joi.object({
  username: Joi.string().required(),
});

module.exports = {
  profileSchema,
};
