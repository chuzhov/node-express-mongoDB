const express = require("express");

const {
  contacts: ctrl,
} = require("../../controllers");
const {
  addContactSchema,
  updateContactSchema,
  updateFavoriteSchema,
} = require("../validation/index");
const validateBody = require("../../middlewares/index");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getOne);

router.post(
  "/",
  validateBody(addContactSchema),
  ctrl.add
);

router.put(
  "/:contactId",
  validateBody(updateContactSchema),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  validateBody(updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.delete(
  "/:contactId",
  validateBody(updateFavoriteSchema),
  ctrl.remove
);

module.exports = router;
