const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cryptoHandler = require("./crypto-handler.js");
const fileHandler = require("./file-handler.helper.js");

const uploadAndEncryptFile = async (req, res, next) => {
  upload.single('documentFile')(req, res, async (err) => {
    if (err) {
      return res.status(500).send({success: false, message : 'Please upload the file in documentFile key in form multipart'});
    }

    if (!req.file) {
      return res.status(400).send({ success: false, message : 'No file uploaded.'});
    }

    try {
      const encryptedFile = await cryptoHandler.encryptFile(req.file.buffer);

      // Create a unique filename and save the encrypted file
      const filename = `encrypted_${Date.now()}_${req.file.originalname}`;
      const absolutePath = path.join(__dirname, '../../../uploads', filename);

      const relativePath = "/uploads/"+filename;

      await fileHandler.writeFile(absolutePath, encryptedFile);

      req.file.relativePath = relativePath;

      next();
    } catch (error) {
      console.error('Error uploadAndEncryptFile', error);
      throw error;
    }
  });
};

module.exports = { uploadAndEncryptFile };
