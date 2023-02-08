const ctrlWrapper = require("../ctrlWrapper");

const getAll = require("./getAll");
const add = require("./add");

module.exports = {
  getAll: ctrlWrapper(getAll),
  add: ctrlWrapper(add),
};
