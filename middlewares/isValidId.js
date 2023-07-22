const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers/index");

const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  const result = isValidObjectId(contactId);
  if (!result) {
    return next(HttpError(404, `${contactId} not valid id`));
  }
  next();
};

module.exports = isValidId;
