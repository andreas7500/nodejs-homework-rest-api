const handleSaveError = (error, data, next) => {
  const { code, name } = error;
  error.status = code === 11000 && name === "MongoServerError" ? 409 : 400;
  next();
};

const handleUpdateValid = function (next) {
  this.options.runValidators = true;
  next();
};
module.exports = { handleSaveError, handleUpdateValid };
