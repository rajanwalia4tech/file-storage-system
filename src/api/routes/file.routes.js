const express = require("express");
const router = express.Router();
const {uploadAndEncryptFile} = require("../helpers/multer.helper");
const {fileController} = require("../controllers");

// TODO: need to add the joi validation
router.post("/upload", uploadAndEncryptFile, fileController.uploadFile);

router.get("/download/:fileId", fileController.downloadFile);

module.exports = router;
