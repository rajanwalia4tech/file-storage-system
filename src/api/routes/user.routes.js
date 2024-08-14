const express = require("express");
const router = express.Router();
const {userController} = require("../controllers");
const {userValidation} = require("../validations");

router.post("/signup",userValidation.validateSignup, userController.signup);
router.post("/login", userValidation.validateLogin, userController.login);

module.exports = router;
