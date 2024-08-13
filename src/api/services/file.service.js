const cryptoHandler = require("../helpers/crypto-handler");
const {fileRepository} = require("../repository");
const path = require("path");
const fs = require("fs");

class FileService{

    async uploadFile(fileObj,userId){
        console.log("fileObj",fileObj);
        const result = await fileRepository.create({
                mimeType : fileObj.mimetype,
                fileName : fileObj.filename,
                filePath : fileObj.relativePath,
                fileSize : fileObj.size,
                encoding : fileObj.encoding,
                originalFileName : fileObj.originalname,
                uploadDate : new Date(),
                uploadBy : Math.floor(Math.random(100000)).toString()
        });
        return {fileId : result};
    }

    async downloadFile(fileId){
        const fileInfo = await fileRepository.fetchByFileId(fileId);
        if(fileInfo == null){
            throw new Error("File not found");
        }else{
            const absolutePath = path.join(__dirname, "../../../",fileInfo.filePath);
            
            if (!fs.existsSync(absolutePath)) {
                throw new Error("File not found");
            }
        
            try {
                // Read the encrypted file from the given path
                const encryptedFile = fs.readFileSync(absolutePath);

                // Decrypt the file
                const decryptedFile = await cryptoHandler.decryptFile(encryptedFile);
                return {filePath : fileInfo.filePath, absolutePath,  decryptedFile};;
            } catch (error) {
                console.error('Error decrypting file:', error);
                throw new Error("Error decrypting file.");
            }
        }
    }

}


module.exports = new FileService();