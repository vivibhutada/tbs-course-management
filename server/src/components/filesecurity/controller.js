const responseCode = require('../../config/responseCode');
const fs = require("fs");
const { decodeFile } = require('../../helper/FileHelper');
const validation = require("./validation");
const decodedFile = ({ dao, db }) => async (req, res) => {
  try {
    let file = req.params.folder + '/' + req.params.file;
    try {
      file = await decodeFile(file);
      file = process.env.STATIC_FILE_UPLOAD_PATH + file;
      res.download(file, (err) => {
        if (err) {
          console.log('Error sending decrypted file', err.message);
          return commonHelper.sendErrorResponse(res, responseCode.serverError.code, 'fail', validation.messages.failed_decode);
        }
        //delete the decrypted file  after sending it 
        if (fs.existsSync(file)) {
          fs.unlinkSync(file);
        }
      });
    } catch (err) {
      
      file = process.env.STATIC_FILE_UPLOAD_PATH + file;
      res.download(file, (err) => {
        if (err) {
          console.log('Error sending file', err.message);
          return commonHelper.sendErrorResponse(res, responseCode.serverError.code, 'fail', validation.messages.failed_decode);
        }
      });
    }
  } catch (err) {
   
    return commonHelper.sendErrorResponse(res, responseCode.serverError.code, 'fail', responseCode.serverError.msg, err.message);
  }
};


module.exports = {
  decodedFile
}


