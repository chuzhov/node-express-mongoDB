const { Contact } = require("../../models/index");
const {
  HttpError,
} = require("../../routes/errors/HttpErrors");

const remove = async (req, res) => {
  const { contactId } = req.params;
  const dbAnswer =
    await Contact.findByIdAndDelete(contactId);
  if (!dbAnswer)
    throw HttpError(
      404,
      `Not found. [id ${req.params.contactId}]`
    );
  res.json(dbAnswer);
};

module.exports = remove;
