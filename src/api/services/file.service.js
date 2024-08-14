const cryptoHandler = require("../helpers/crypto-handler");
const {fileRepository} = require("../repository");
const path = require("path");
const fileHandler = require("../helpers/file-handler.helper");

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

    async downloadFile(fileId, res){
        const fileInfo = await fileRepository.fetchByFileId(fileId);
        if(fileInfo == null){
            throw new Error("File not found");
        }else{
            try {
                const absolutePath = path.join(__dirname, "../../../",fileInfo.filePath);
                // Read the encrypted file from the given path
                const encryptedFile = await fileHandler.readFile(absolutePath);

                // Decrypt the file
                const decryptedFile = await cryptoHandler.decryptFile(encryptedFile);
                
                return {filePath : fileInfo.filePath, absolutePath,  decryptedFile};;
            } catch (error) {
                console.error('Error in file.service -> downloadFile:', error.message);
                throw error;
            }
        }
    }

}


module.exports = new FileService();