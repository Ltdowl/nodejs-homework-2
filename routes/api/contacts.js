const express = require("express");

const ctrl =require("../../controllers/contacts")

const router = express.Router();

router.get("/", ctrl.getListContacts);

router.get("/:id", ctrl.getById);

router.post("/", ctrl.postContact);

router.delete("/:id", ctrl.deleteContactById);

router.put("/:id", ctrl.updateContactById);

module.exports = router;
