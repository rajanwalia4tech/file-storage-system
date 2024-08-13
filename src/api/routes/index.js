const express = require("express");
const router = express.Router();
const fileRoutes = require("./file.routes");
const userRoutes = require("./user.routes");

router.use("/file",fileRoutes);
router.use("/user",userRoutes);

module.exports = router;
