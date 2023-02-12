const ctrlWrapper = require("../ctrlWrapper");

const getAll = require("./getAll");
const add = require("./add");
const getOne = require("./getOne");
const remove = require("./remove");
const update = require("./update");

module.exports = {
  getAll: ctrlWrapper(getAll),
  getOne: ctrlWrapper(getOne),
  add: ctrlWrapper(add),
  update: ctrlWrapper(update),
  remove: ctrlWrapper(remove),
};
