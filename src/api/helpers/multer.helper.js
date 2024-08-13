const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const cryptoHandler = require("./crypto-handler.js");

// Helper to handle file upload and encryption
const uploadAndEncryptFile = async (req, res, next) => {
  upload.single('documentFile')(req, res, async (err) => {
    if (err) {
      return res.status(500).send('Error uploading file.');
    }

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    try {
      // Encrypt the file buffer
      const encryptedFile = await cryptoHandler.encryptFile(req.file.buffer);

      // Create a unique filename and save the encrypted file
      const filename = `encrypted_${Date.now()}_${req.file.originalname}`;
      const absolutePath = path.join(__dirname, '../../../uploads', filename);

      const relativePath = "/uploads/"+filename;

      fs.writeFileSync(absolutePath, encryptedFile);

      // Add the file path to the request object for further processing
      req.file.relativePath = relativePath;
      req.file.filename = "sds"

      // Proceed to the next middleware or route handler
      next();
    } catch (error) {
      console.error('Error encrypting file:', error);
      res.status(500).send('Error encrypting file.');
    }
  });
};

module.exports = { uploadAndEncryptFile };
