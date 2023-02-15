const { Contact } = require("../../models/index");

const update = async (req, res) => {
  const { contactId } = req.params;

  function validator(val) {
    console.log(val);
  }

  Contact.validate(
    validator,
    "validation of `{PATH}` failed with value `{VALUE}`"
  );
  const dbAnswer =
    await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { returnDocument: "after" }
    );
  res.status(200).json(dbAnswer);
};

module.exports = update;
