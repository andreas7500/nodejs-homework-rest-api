const express = require("express");

const validateBody = require("../../decorators/validateBody");

const { isEmptyBody, isValidId } = require("../../middlewares/index");

const contactSchema = require("../../schemas/contact-schemas");

const { authenticate } = require("../../middlewares/index");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.use(authenticate);

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post(
  "/",

  isEmptyBody,
  validateBody(contactSchema.contactAddSchema),
  ctrl.add
);

router.put(
  "/:contactId",

  isValidId,
  isEmptyBody,
  validateBody(contactSchema.contactAddSchema),
  ctrl.update
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(contactSchema.updateFavoriteSchema),
  ctrl.updateFavorite
);

router.delete("/:contactId", isValidId, ctrl.remove);

module.exports = router;
