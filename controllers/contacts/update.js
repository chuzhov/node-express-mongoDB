const { Contact } = require("../../models/index");

const update = async (req, res) => {
  const { contactId } = req.params;
  const dbAnswer =
    await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { returnDocument: "after" }
    );
  res.status(200).json(dbAnswer);
};

module.exports = update;
