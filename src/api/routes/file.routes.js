const express = require("express");
const router = express.Router();
const {uploadAndEncryptFile} = require("../helpers/multer.helper");
const {fileController} = require("../controllers");
const AuthMiddleware = require("../middlewares/auth.middleware");

// TODO: need to add the joi validation
router.post("/upload", AuthMiddleware.authenticateToken, uploadAndEncryptFile, fileController.uploadFile);

router.get("/download/:fileId", AuthMiddleware.authenticateToken, fileController.downloadFile);

module.exports = router;
