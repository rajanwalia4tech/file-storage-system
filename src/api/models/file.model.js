const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  fileName:{
    type: String, // this is the file name on the server
    required: true,
  },
  filePath: {
    type: String, // this is the file path on the server.
    required: true,
  },
  originalFileName: {
    type: String,
    required: true,
  },
  fileSize: {
    type: Number, // in bytes
    required: true,
  },
  mimeType : {
    type : String,
    required:true
  },
  encoding:{
    type:String,
    required:true
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  uploadBy: {
    type: String, // userId who has uploaded this.
    required: true,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
});

// TODO: need to add the error fields

const File = mongoose.model('File', fileSchema);

module.exports = File;
