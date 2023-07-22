const handleSaveError = (error, data, next) => {
  error.status = 400;
  next();
};
// module.exports = handleSaveError;

const handleUpdateValid = function (next) {
  this.options.runValidators = true;
  next();
};
module.exports = { handleSaveError, handleUpdateValid };
