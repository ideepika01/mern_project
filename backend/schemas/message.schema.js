const Joi = require('joi');

const messageSchema = Joi.object({
  sender: Joi.string().required(),
  receiver: Joi.string().required(),
  message: Joi.string().required().min(1),
});

module.exports = {
  messageSchema,
};
