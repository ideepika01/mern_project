const Joi = require('joi');

const registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(6),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
