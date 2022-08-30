const express = require("express");

const { login } = require("../../middlewares");

const ctrl = require("../../controllers/contacts");

const router = express.Router();

router.get("/", login, ctrl.getAll);

router.get("/:contactId", login, ctrl.getById);

router.post("/", login, ctrl.add);

router.delete("/:contactId", login, ctrl.removeById);

router.put("/:contactId", login, ctrl.updateById);

router.patch("/:contactId/favorite", login, ctrl.updateStatusContact);

module.exports = router;
