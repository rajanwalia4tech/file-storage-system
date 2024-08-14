const cryptoHandler = require("../helpers/crypto-handler");
const {fileRepository} = require("../repository");
const path = require("path");
const fileHandler = require("../helpers/file-handler.helper");

class FileService{

    async uploadFile(fileObj,userId){
        const result = await fileRepository.create({
                mimeType : fileObj.mimetype,
                filePath : fileObj.relativePath,
                fileSize : fileObj.size,
                encoding : fileObj.encoding,
                originalFileName : fileObj.originalname,
                uploadDate : new Date(),
                uploadBy : userId
        });
        return {fileId : result._id};
    }

    async downloadFile(fileId, userId){
        const fileInfo = await fileRepository.fetchByFileId(fileId,userId);
        if(fileInfo == null){
            throw new Error("File not found");
        }else{
            const absolutePath = path.join(__dirname, "../../../",fileInfo.filePath);
            // Read the encrypted file from the given path
            const encryptedFile = await fileHandler.readFile(absolutePath);

            // Decrypt the file
            const decryptedFile = await cryptoHandler.decryptFile(encryptedFile);
            
            return {filePath : fileInfo.filePath, absolutePath,  decryptedFile};
        }
    }

}


module.exports = new FileService();