const getAll = require("./getAll");
const getById = require("./getById");
const add = require("./add");
const update = require("./update");
const remove = require("./remove");
const updateFavorite = require("./updateFavorite");
const ctrlWrapper = require("../../decorators/ctrlWrapper");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
  updateFavorite: ctrlWrapper(updateFavorite),
};
