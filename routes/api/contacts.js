const express = require("express");
const Joi = require("joi");

const {
  contacts: ctrl,
} = require("../../controllers");

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

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOne);

router.post("/", ctrl.add);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", ctrl.update);

router.patch("/:contactId/favorite", ctrl.update);

module.exports = router;
