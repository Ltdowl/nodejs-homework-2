const express = require("express");

const { login, upload } = require("../../middlewares");

const ctrl = require("../../controllers/users");
console.log(ctrl);

const router = express.Router();

router.post("/signup", ctrl.signup);

router.post("/login", ctrl.login);

router.get("/logout", login, ctrl.logout);

router.get("/current", login, ctrl.getCurrent);

router.patch("/avatars", login, upload.single("avatar"), ctrl.setAvatar);

module.exports = router;
