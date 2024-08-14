const express = require("express");
const router = express.Router();
const {uploadAndEncryptFile} = require("../helpers/multer.helper");
const {fileController} = require("../controllers");
const authMiddleware = require("../middlewares/auth.middleware");
const {fileValidation} = require("../validations");

router.post("/upload", authMiddleware.authenticateToken, uploadAndEncryptFile, fileController.uploadFile);

router.get("/download/:fileId", fileValidation.downloadFile, authMiddleware.authenticateToken, fileController.downloadFile);

module.exports = router;
