const Joi = require("joi");

// Joi validation schemas
const schemaCreateContact = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(7).max(27).required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3).max(30).optional(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .optional(),
  phone: Joi.string().min(7).max(27).optional(),
});

// POST method validation middleware
function validateCreateContact(req, res, next) {
  const { error } = schemaCreateContact.validate(req.body);
  if (error) {
    const errorMessage = `Missing required ${error.details[0].context.label} field`;
    return res.status(400).json({ message: errorMessage });
  }
  next();
}

// PUT method validation middleware
function validateUpdateContact(req, res, next) {
  if (!req.body) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const { error } = schemaUpdateContact.validate(req.body);
  if (error) {
    const errorMessage = `Missing required ${error.details[0].context.label} field`;
    return res.status(400).json({ message: errorMessage });
  }
  next();
}

module.exports = { validateCreateContact, validateUpdateContact };

// рррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррррр

// const Joi = require("joi");

// const schemaCreateContact = Joi.object({
//   name: Joi.string().min(3).max(30).required(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .required(),
//   phone: Joi.string().min(7).max(27).required(),
// });

// const schemaUpdateContact = Joi.object({
//   name: Joi.string().min(3).max(30).optional(),
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//       tlds: { allow: ["com", "net"] },
//     })
//     .optional(),
//   phone: Joi.string().min(7).max(27).optional(),
// });

// function validateCreateContact(req, res, next) {
//   const { error } = schemaCreateContact.validate(req.body);
//   if (error) {
//     return res.status(400).json({
//       message: `Missing required ${error.details[0].context.label} field`,
//     });
//   }
//   next();
// }

// function validateUpdateContact(req, res, next) {
//   const { error } = schemaUpdateContact.validate(req.body);
//   console.log(req.body);
//   if (error) {
//     return res.status(400).json({ message: "Missing fields" });
//   }
//   next();
// }

// module.exports = {
//   validateCreateContact,
//   validateUpdateContact,
// };
