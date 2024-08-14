const multer = require('multer');
const fs = require('fs');
const path = require('path');
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1000000 },// 50 MB = 50*1000000 bytes
}); 
const cryptoHandler = require("./crypto-handler.js");
const fileHandler = require("./file-handler.helper.js");

const uploadAndEncryptFile = async (req, res, next) => {
  upload.single('documentFile')(req, res, async (err) => {
    if (err) {
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.status(400).send({success: false, message : "You can maximum upload 50MB file."});
        }else if(err.code == "LIMIT_UNEXPECTED_FILE"){
          return res.status(400).send({success: false, message : 'Please upload the file in documentFile key in form/multipart'});
        }else{
          console.error("Error while uploadAndEncryptFile", err.message);
          return res.status(500).send({success: false, message : "something went wrong while uploading document, Please try again!"});
        }
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
