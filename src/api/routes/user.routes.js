const express = require("express");
const router = express.Router();
const {userController} = require("../controllers");

router.post("/auth",userController.login);

module.exports = router;
