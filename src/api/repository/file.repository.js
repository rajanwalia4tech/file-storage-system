const { File } = require("../models");

class FileRepository{
    constructor(){}

    async create(payload){
        const newFile = new File(payload);
        await newFile.save();
        return newFile;
    }

    async fetchByFileId(fileId, userId){
        const data = await File.findOne({_id : fileId, uploadBy : userId},{filePath:1,fileName:1}).lean();
        return data;
    }
}

module.exports = new FileRepository();