const express = require("express");

const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../helpers/dataValidator");

const router = express.Router();

const ctrl = require("../../controllers/contacts");

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", validateCreateContact, ctrl.add);

router.put("/:contactId", validateUpdateContact, ctrl.update);

router.delete("/:contactId", ctrl.remove);

module.exports = router;
