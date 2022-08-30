const express = require("express");

const { login } = require("../../middlewares");

const ctrl = require("../../controllers/users");
console.log(ctrl);

const router = express.Router();

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", login, ctrl.logout);

router.get("/current", login, ctrl.getCurrent);

module.exports = router;
