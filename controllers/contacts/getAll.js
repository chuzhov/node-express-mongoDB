const { Contact } = require("../../models/index");

const getAll = async (req, res) => {
  const dbAnswer = await Contact.find({});
  res.json(dbAnswer);
};

module.exports = getAll;
