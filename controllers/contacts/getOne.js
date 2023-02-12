const { Contact } = require("../../models/index");

const getOne = async (req, res) => {
  const { contactId } = req.params;
  const dbAnswer = await Contact.findById(
    contactId
  );
  res.json(dbAnswer);
};

module.exports = getOne;
