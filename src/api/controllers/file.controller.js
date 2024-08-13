const {fileService} = require("../services");
const path = require("path");
const fs = require("fs");

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


            // Set headers to prompt the user to download the file
            res.setHeader('Content-Disposition', `attachment; filename=${data.fileName}`);
            res.setHeader('Content-Type', 'application/octet-stream');

            // Create a read stream and pipe it to the response
            const fileStream = fs.createReadStream(data.absolutePath);

            // Pipe the file stream to the response
            fileStream.pipe(res);

            // Handle stream errors
            fileStream.on('error', (error) => {
                console.error('Error reading file:', error);
                res.status(500).send('Error reading file.');
            });
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