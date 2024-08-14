const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  uploadBy: {
    type: mongoose.Schema.Types.ObjectId, // _id of the user's collection
    ref : "User"
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
  }
});

// TODO: need to add the error fields

const File = mongoose.model('File', fileSchema);

module.exports = File;
