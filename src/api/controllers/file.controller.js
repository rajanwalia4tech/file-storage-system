const {fileService} = require("../services");
const path = require("path");
const fileHandler = require("../helpers/file-handler.helper");

class FileController{
    async uploadFile(req,res,next){
        try{
            const data = await fileService.uploadFile(req.file);
            return res.status(200).send({data, success:true, message : "File uploaded successfully"});
        }catch(err){
            console.error("Error while uploadFile : ",err.message);
            return res.status(400).send({success:false, message : err.message});
        }
    }

    async downloadFile(req,res,next){
        try{
            const fileId = req.params.fileId;
            const data = await fileService.downloadFile(fileId);
            await fileHandler.readFileStream(res, data.filePath, data.decryptedFile);
            // return res.status(200).send({data, success:true, message : "File uploaded successfully"});
            // Set headers for the file download
            // res.setHeader('Content-Disposition', `attachment; filename=${path.basename(data.filePath).replace('encrypted_', '')}`);
            // res.setHeader('Content-Type', 'application/octet-stream');
            // // Send the decrypted file to the client
            // res.send(data.decryptedFile);
        }catch(err){
            console.error("Error while downloadFile : ",err.message);
            return res.status(400).send({success:false, message : err.message});
        }
    }
}

module.exports = new FileController();