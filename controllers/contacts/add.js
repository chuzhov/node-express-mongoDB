const { Contact } = require("../../models/index");

const add = async (req, res) => {
  const dbAnswer = await Contact.create(req.body);
  res.status(201).json(dbAnswer);
};

module.exports = add;
