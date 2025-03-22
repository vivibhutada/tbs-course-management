const util = require('util');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {ManageFileUpload}  = require("../config/constant");
const { log } = require('console');
const {encodeFile}=require('../helper/FileHelper');
const generateRandomNumber =  (user_type) => {
  return "file_" + Math.floor(Math.random(1111,9999));
}
// Define the storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = process.env.STATIC_FILE_UPLOAD_PATH + req.params.folder_name;
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const random_no = generateRandomNumber('property');
    const fileName = file.fieldname + random_no + Date.now() + path.extname(file.originalname);
    cb(null, fileName);
  }
});

// Middleware to dynamically set upload configuration
function dynamicUploadFile(req, res, next) {
  
  let allowedMimeTypes;
  let allowedMimeTypesMsg;
  switch (req.params.uploadtype) {
    case 'images':
        allowedMimeTypes = ManageFileUpload.Images.allowed;
        allowedMimeTypesMsg = ManageFileUpload.Images.allowedmsg;
    break;
    case 'Import':
        allowedMimeTypes = ManageFileUpload.Import.allowed;
        allowedMimeTypesMsg = ManageFileUpload.Import.allowedmsg;
    break;
    default:
      allowedMimeTypes = ManageFileUpload.Default.allowed;
      allowedMimeTypesMsg = ManageFileUpload.Default.allowedmsg;
  }

  const fileData = ManageFileUpload.FILE_SIZE_LIMIT.UNIT;//"KB";
  const fileSizeSetting = ManageFileUpload.FILE_SIZE_LIMIT.SIZE;//500;
  let maxSize;
  if (fileData === 'MB') {
    maxSize = fileSizeSetting * 1024 * 1024; // Convert MB to bytes
  } else if (fileData === 'KB') {
    maxSize = fileSizeSetting * 1024;
  } else {
    return next(new Error('Invalid file size unit.')); // Handle unexpected unit
  }
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: maxSize,
      files: ManageFileUpload.FILE_SIZE_LIMIT.NOOFfILES,//100
    },
    fileFilter: (req, file, cb) => {
      // const allowedMimeTypes = [
      //   'application/pdf',
      //   'application/msword',
      //   'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      //   'image/jpeg',
      //   'image/jpg',
      //   'image/png',
      //   'image/webp',
      //   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      //   'application/vnd.ms-excel'
      //  ];

      if (allowedMimeTypes.includes(file.mimetype)) { // allowedMimeTypes.includes(file.mimetype)
        cb(null, true);
      } else {
        cb(null, false);
        cb(new Error(allowedMimeTypesMsg));
        //new Error('Only .pdf, .doc, .docx, .jpg, .jpeg, .png, .xlsx, .webp and .xls files are allowed.')
      }
    }
  }).any();
  //const uploadMethod = single ? upload.single('file') : upload.any();

  upload(req, res, function (err){

    if (err) {
      return next(err);
    }
    
    if(process.env.isFileEncReq == 1 && req.files && req.files.length>0 && req.params.uploadtype == "images"){
      
      for(let file of req.files){
        // console.log('file.destination',file.destination);
        let encFileName= 'enc_'+file.filename;
        const encryptedPath=`${file.destination}/${encFileName}`;

        // console.log('encryptedPath',encryptedPath);
        try{
          encodeFile(file.path,encryptedPath);
          file.encryptedPath=encryptedPath;    //save encrypted file path
          file.filename = encFileName;
          fs.unlinkSync(file.path);           //remove original file
        }catch(error){
          return next(error);
        }
        
      }
    }
      
      //encrypt the uploaded file
    
    
    next();
  });
}

const uploadFileMiddleware = util.promisify(dynamicUploadFile);
module.exports = uploadFileMiddleware;
