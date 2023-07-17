// const Joi = require("joi");

// Joi validation schemas
// const schemaCreateContact = Joi.object({
//   name: Joi.string().min(3).max(30).required().messages({
//     "any.required": `missing required name field`,
//   }),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//     .required()
//     .messages({
//       "any.required": `missing required email field`,
//     }),
//   phone: Joi.string()
//     .min(7)
//     .max(27)
//     .required()
//     .messages({ "any.required": `missing required phone field` }),
// });

// const schemaUpdateContact = Joi.object({
//   name: Joi.string().min(3).max(30).required().messages({
//     "any.required": `missing required name field`,
//   }),
//   email: Joi.string()
//     .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
//     .required()
//     .messages({
//       "any.required": `missing required email field`,
//     }),
//   phone: Joi.string()
//     .min(7)
//     .max(27)
//     .required()
//     .messages({ "any.required": `missing required phone field` }),
// });

// POST method validation middleware
// function validateCreateContact(req, res, next) {
//   const { error } = schemaCreateContact.validate(req.body);
//   if (error) {
//     const errorMessage = `Missing required ${error.details[0].context.label} field`;
//     return res.status(400).json({ message: errorMessage });
//   }
//   next();
// }

// PUT method validation middleware

// function validateUpdateContact(req, res, next) {
//   if (!Object.keys(req.body).length) {
//     return res.status(400).json({ message: "Missing fields" });
//   }

//   const { error } = schemaUpdateContact.validate(req.body);
//   if (error) {
//     const errorMessage = `Missing required ${error.details[0].context.label} field`;
//     return res.status(400).json({ message: errorMessage });
//   }
//   next();
// }
const Joi = require("joi");

const schemaValidate = Joi.object({
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
});

// POST method validation middleware
function validateCreateContact(req, res, next) {
  const { error } = schemaValidate.validate(req.body);
  if (error) {
    const errorMessage = error.message;
    return res.status(400).json({ message: errorMessage });
  }

  next();
}

// PUT method validation middleware
function validateUpdateContact(req, res, next) {
  if (!Object.keys(req.body).length) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { error } = schemaValidate.validate(req.body);
  if (error) {
    const errorMessage = error.message;
    return res.status(400).json({ message: errorMessage });
  }

  next();
}

module.exports = { validateCreateContact, validateUpdateContact };
