const Joi = require("joi");
const emailRegexp = require("../models/emailRegexp");

// registr

const userSignupSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

// verify

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

// login
const userSigninSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});
// subscription
const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = {
  userSignupSchema,
  userSigninSchema,
  subscriptionSchema,
  emailSchema,
};
