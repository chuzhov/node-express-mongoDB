const { Schema, model } = require("mongoose");

const contactSchema = Schema(
  {
    name: {
      type: String,
      required: [
        true,
        "Name property is required",
      ],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { timestamp: true }
);

const Contact = model("contact", contactSchema);

module.exports = Contact;
