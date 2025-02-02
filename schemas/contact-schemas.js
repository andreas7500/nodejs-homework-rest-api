const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required()
    .messages({
      "any.required": `missing required email field`,
    }),
  phone: Joi.string()
    .min(7)
    .max(27)
    .required()
    .messages({ "any.required": `missing required phone field` }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({
    "any.required": `missing required favorite field`,
  }),
});

module.exports = { contactAddSchema, updateFavoriteSchema };
