const {fileService} = require("../services");
const path = require("path");
const fileHandler = require("../helpers/file-handler.helper");

class FileController{
    async uploadFile(req,res,next){
        try{
            const userId = req.user.userId;
            const data = await fileService.uploadFile(req.file, userId);
            return res.status(200).send({data, success:true, message : "File uploaded successfully"});
        }catch(err){
            console.error("Error while uploadFile : ",err.message);
            return res.status(400).send({success:false, message : err.message});
        }
    }

    async downloadFile(req,res,next){
        try{
            const userId = req.user.userId;
            const fileId = req.params.fileId;
            const data = await fileService.downloadFile(fileId,userId);
            // send the response via stream as it is long file
            await fileHandler.readFileStream(res, data.filePath, data.decryptedFile);
            return true;
        }catch(err){
            console.error("Error while downloadFile : ",err.message);
            return res.status(400).send({success:false, message : err.message});
        }
    }
}

module.exports = new FileController();