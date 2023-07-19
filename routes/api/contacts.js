const express = require("express");

const validateBody = require("../../decorators/validateBody");

const { isEmptyBody } = require("../../middlewares/index");

const contactSchema = require("../../schemas/contact-schemas");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactSchema.contactAddSchema),
  ctrl.add
);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactSchema.contactAddSchema),
  ctrl.update
);

router.delete("/:contactId", ctrl.remove);

module.exports = router;
