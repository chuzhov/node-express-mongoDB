const express = require("express");
const Joi = require("joi");

const {
  contacts: ctrl,
} = require("../../controllers");

const json_cm = require("../../models/j-contacts");

const {
  HttpError,
} = require("../errors/HttpErrors");

const postContactSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
  })
  .or("email", "phone")
  .messages({
    "any.required": "missing required name field",
    "object.missing":
      "One of [email] or [phone] values should be not null",
  });

const putContactSchema = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
  })
  .or("name", "email", "phone")
  .messages({
    "object.missing":
      "Missing fields: [name], [email] or [phone] values should be not null",
  });

const router = express.Router();

// router.get("/", async (req, res, next) => {
//   try {
//     const contacts = await json_cm.listContacts();
//     res.json({ contacts });
//   } catch (error) {
//     next(error);
//   }
// });

router.get("/", ctrl.getAll);

router.get(
  "/:contactId",
  async (req, res, next) => {
    try {
      const contact =
        await json_cm.getContactById(
          req.params.contactId
        );
      if (!contact) {
        throw HttpError(
          404,
          `Not found. [id ${req.params.contactId}]`
        );
      }
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

// router.post("/", async (req, res, next) => {
//   try {
//     const { error } = postContactSchema.validate(
//       req.body
//     );
//     console.log(error);
//     if (error) {
//       throw HttpError(400, error.message); // Joi validation error
//     }
//     const contact = await json_cm.addContact(
//       req.body
//     );
//     res.status(201).json(contact);
//   } catch (error) {
//     next(error);
//   }
// });

router.post("/", ctrl.add);

router.delete(
  "/:contactId",
  async (req, res, next) => {
    try {
      const contact = await json_cm.removeContact(
        req.params.contactId
      );
      if (!contact)
        throw HttpError(
          404,
          `Not found. [id ${req.params.contactId}]`
        );
      res.json({
        message: "Contact deleted",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { value, error } =
        putContactSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message); // Joi validation error
      }
      const id = req.params.contactId;
      const contact = await json_cm.updateContact(
        id,
        req.body
      );
      if (!contact)
        throw HttpError(
          404,
          `Not found [id ${id}]`
        );
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
