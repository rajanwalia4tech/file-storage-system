const { File } = require("../models");

class FileRepository{
    constructor(){}

    async create(payload){
        const newFile = new File(payload);
        await newFile.save();
        return newFile;
    }

    async fetchByFileId(fileId){
        const data = await File.findById(fileId,{filePath:1}).lean();
        return data;
    }
}

module.exports = new FileRepository();