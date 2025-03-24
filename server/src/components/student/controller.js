const uploadFileMiddleware = require("../../middleware/all_uploads");
const multer = require("multer");
const path = require('path');
const xlsx = require('xlsx');
const responseCode = require('../../config/responseCode');
const { log } = require('console');
const fs= require("fs");

const getAll = ({ dao, db, validation }) => async (req, res,next) => {
  try {
    const body=req.body;
    const { error } = await validation.filter_schema.validate(body);
    if (error) {
      return commonHelper.sendErrorResponse(res,responseCode.validation.code,'fail',responseCode.validation.msg,error.details.map((err) => err.message));
    }
    const result = await dao.getAll({ db, validation })(body);
    if (result.students.length > 0) {
      return commonHelper.sendSuccessResponse(res, 200, 'success', validation.messages.list,
      result);
    } else {
      return commonHelper.sendSuccessResponse(res, 200, 'fail', validation.messages.no_data, result);
    }
  } catch (error) {
    console.log('checklogin err==>>', error); next(error) 
  }
};
const getById = ({ dao, db,validation}) => async (req, res,next) => {
  try {
    const id=req.params.id
    const result = await dao.getById({ db,validation })(id);
    if(result.students){
      return commonHelper.sendSuccessResponse(res, 200, 'success',validation.messages.list, result);
    }else{
      return commonHelper.sendSuccessResponse(res, 200, 'fail',validation.messages.no_data, result);
    }
    
  } catch (error) {
    console.log('checklogin err==>>', error); next(error) 
    
  }
};

const save = ({ dao, db,validation}) => async (req, res,next) => {
   let imgpath='';
  try {
      req.params.folder_name = "studentimage";
      req.params.uploadtype = "images";
      await uploadFileMiddleware(req, res);
        if(req.files && req.files.length > 0){
          req.body.files = req.files.map((file)=> req.params.folder_name+'/'+file.filename);
          imgpath = req.body.files[0];
        };
      let body=req.body;  
      body.image =   imgpath;
      // validation check
      const { error } = await validation.schema.validate(body);
      if (error) {
        commonHelper.fileUnlink(imgpath);
        return commonHelper.sendErrorResponse(res,responseCode.validation.code,'fail',responseCode.validation.msg,error.details.map((err) => err.message));
      }
     
      body.createdby=req.user.userid;
      let result = await dao.save({ db ,validation})(body,req);
      if(result.status){
        return commonHelper.sendSuccessResponse(res,responseCode.success.code,'success',result.message);
      }else{ 
        commonHelper.fileUnlink(body.image);
        return commonHelper.sendErrorResponse(res,responseCode.success.code,'fail',result.message);
      }
  } catch (error) {
    
    commonHelper.fileUnlink(imgpath);
    console.log('checklogin err==>>', error); next(error) 
  }
};

const update = ({ dao, db, validation }) => async (req,res,next) => {
  let imgpath = '';

  try { 
    req.params.folder_name = "studentimage";
    req.params.uploadtype = "images";
    await uploadFileMiddleware(req, res);
    if (req.files && req.files.length > 0) {
      req.body.files = req.files.map((file) => req.params.folder_name + '/' + file.filename);
      imgpath = req.body.files[0];
    }
    const context = { isUpdate: true };

    let body = req.body;
    body.image = imgpath;


    const { error } = await validation.schema.validate(body, { context });
    if (error) {
      commonHelper.fileUnlink(imgpath);
      return commonHelper.sendErrorResponse(res, responseCode.validation.code, 'fail', responseCode.validation.msg, error.details.map((err) => err.message));
    }
    body.createdby = req.user.userid;
    let result = await dao.update({ db, validation })(body, req);
    if (result.status) {
      return commonHelper.sendSuccessResponse(res, responseCode.success.code, 'success', result.message);
    } else {
      commonHelper.fileUnlink(imgpath);
      return commonHelper.sendErrorResponse(res, responseCode.success.code, 'fail', result.message);
    }
  } catch (error) {
    commonHelper.fileUnlink(imgpath);
    console.log('checklogin err==>>', error); next(error);
  }
};

const deleteById = ({ dao, db,validation}) => async (req, res,next) => {

  try {
    let body=req.body;   
      // validation check
    const { error } = await validation.deleteSchema.validate(body);
    if (error) {
      return commonHelper.sendErrorResponse(res,responseCode.validation.code,'fail',responseCode.validation.msg,error.details.map((err) => err.message));
    }
    req.body.userid = req.user.userid;
    const result = await dao.deleteById({ db ,validation})(body);
    if(result.status){
      return commonHelper.sendSuccessResponse(res,responseCode.success.code,'success',result.message);
    }else{ 
      return commonHelper.sendErrorResponse(res,responseCode.success.code,'fail',result.message);
    }
  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
};



const importRecord = ({ dao, db,validation}) => async (req, res,next) => {
  try {
    let filePath = ''
    req.params.folder_name = "studentimport";
    req.params.uploadtype = "Import";
    await uploadFileMiddleware(req, res);
    if(req.files && req.files.length > 0){
      
      //await dao.deleteImportTempData({ db})(req.user.userid);
      //importFile = req.files[0];
      req.body.files = req.files.map((file)=> file);
      filePath = req.body.files[0].path;
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName])
      let successCount = 0;
      let failCount = 0;
      let failedRecords = [];
      for (const record of sheetData) {
          console.log(record);
          try {
            record.mobile_no = String(record.mobile_no);
            const {error} = await validation.schema.validate({
              roll_no: record.roll_no,	
              firstname: record.firstname,
              middlename: record.middlename,
              lastname: record.lastname,	
              dob: String(record.dob),
              gender: record.gender,	
              mobile_no: record.mobile_no,
              adhar_no: String(record.adhar_no),	
              pan_no: String(record.pan_no),
            });
            
            if(error){
               throw error;
            }else{
              record.image = null;
              record.createdby=req.user.userid;
              let result = await dao.save({ db ,validation})(record);
              if(result.status){
                successCount++;
              }else{
                throw new Error(result.message);
              }
            }
            
          } catch (error) {
            let errormsg='';
            if(error.isJoi){
              errormsg = error.details.map((err)=>err.message).join(", ");
            }else{
              errormsg=error.message;
            }
            record.remark = errormsg;
            record.image = null;
            record.createdby=req.user.userid;
            let result = await dao.importFailRecordInsert({ db ,validation})(record);
            failCount++;
            failedRecords.push({
              ...record,
            })
          }
      }
      let totalRecord = sheetData.length;
      let message = "Out of "+totalRecord+" records ";
      if(successCount > 0){
         var isAre =  successCount==1 ? 'is':'are';
         message+= successCount+" "+isAre+" "+"successfully inserted ";
      }
      if(failCount > 0){
        var isAre =  failCount==1 ? 'is':'are';
        message+= failCount+" "+isAre+" "+"failed";
     }
     return commonHelper.sendSuccessResponse(res,responseCode.success.code,'success',message,{failCount:failCount,failedRecords:failedRecords});
    }else{
      return commonHelper.sendErrorResponse(res,responseCode.success.code,'fail',validation.messages.no_file_uploaded);
    }
    
  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
};

const getSampleFile = ({ dao, db,validation}) => async (req, res,next) => {
  try {
    const filePath =  commonHelper.generateSampleFilelink('importSamplefiles/students-import-sample-file.xlsx');
    console.log(filePath);
    return commonHelper.sendSuccessResponse(res, 200, 'success',"Import failed list",[{file:filePath}]);
  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
 
};

const getImportFailedList = ({ dao, db,validation}) => async (req, res,next) => {
  
  try {
    const result = await dao.getImportFailRecord({db})(req.user.userid);
    if(result.failedRecords.length > 0){
      return commonHelper.sendSuccessResponse(res, 200, 'success',"Import failed list", result);
    }else{
      return commonHelper.sendSuccessResponse(res, 200, 'fail',validation.messages.no_data, result);
    }
  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
   
  }
}; 

const exportFailedImportList = ({ dao, db,validation}) => async (req, res,next) => {
  
  try {
    const result = await dao.getImportFailRecord({db})(req.user.userid);
    if(result.failedRecords.length > 0){

       const sanitizedRecords = result.failedRecords.map(({id,...rest})=>rest);
       // convert data to work sheet
       const worksheet = xlsx.utils.json_to_sheet(sanitizedRecords);
      
       // create a newbook and append the worksheet
       const workbook = xlsx.utils.book_new();
       xlsx.utils.book_append_sheet(workbook,worksheet,"sheet1");
       
       // unique filename
       const fileName = `failed_import_list_${Date.now()}.xlsx`;
       const filePath = path.join(process.env.STATIC_FILE_UPLOAD_PATH,'exports',fileName);
       console.log(filePath);
       const dir = path.dirname(filePath);
       console.log(dir);
       if(!fs.existsSync(dir)){
          console.log("here123");
          fs.mkdirSync(dir,{recursive:true});
       }
       // write the excel file
       xlsx.writeFile(workbook,filePath);
       //generate download link
       const downloadlink = commonHelper.generateSampleFilelink(`exports/${fileName}`);//
       return commonHelper.sendSuccessResponse(res, 200, 'success',validation.messages.export_fail_file, [{"downloadlink":downloadlink}]);

    }else{
      return commonHelper.sendSuccessResponse(res, 200, 'fail',validation.messages.no_data, result);
    }
  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
}; 

const test = ({ dao, db,validation}) => async (req, res,next) => {
 
      try {
        console.log("this is testing function");
        return commonHelper.sendSuccessResponse(res, 200, 'success','Testing function hit ', []);
      } catch (error) {
        console.log('checklogin err==>>', error); next(error);
      } 
        
};

const columnEncryptionDecryption = ({ dao, db,validation}) => async (req, res,next) => {
  try {
    const {pk,table_name,columns,flag} = req.body;
    if(!table_name || !pk || !columns || !Array.isArray(columns)|| !flag ){
      return commonHelper.sendSuccessResponse(res, 200, 'fail','pk,table_name,flag and columns are required and can not be empty and columns must be in array ', []);  
    }
 
    const formattedColumns= columns.map(col => `${col}`).join(",");

    // make dynamic query
    const makeQuery = `select ${pk},${formattedColumns} from ${table_name}`;
    const [records] = await db.sequelize.query(makeQuery);
    if(records.length>0){
        const updatedRecords = records.map(record=>
          columns.reduce((updatedRecords,column)=>{
              if(column in record){
                  if(flag ==='encrypt'){
                    updatedRecords[column] = commonHelper.valueEncryption(record[column]);
                    
                    //,
                  }else if(flag ==='decrypt'){
                    updatedRecords[column] = commonHelper.valueDecryption(record[column]);
                  }
              }
              return updatedRecords;
          },{...record}) 
        );

        // update record 
        for(const record of updatedRecords){
            const updates = columns
              .filter(column => column in record) // only include columns thatexist in record 
              .map(column => `${column} = :${column}`) // generate `column = value ` format
              .join(", ");
              const updateQuery = `UPDATE ${table_name} SET ${updates} WHERE ${pk} = :pk`;
              await db.sequelize.query(updateQuery,{replacements: {
                  ...record,
                  pk:record[pk], // Add pk dynamic
                },
              });
              
        }
      return commonHelper.sendSuccessResponse(res, 200, 'success','Records are updated successfully', []);  
        
    }else{
      return commonHelper.sendSuccessResponse(res, 200, 'fail',validation.messages.no_data, result);
    }
  
  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
};

const updateStatus = ({ dao, db, validation }) => async (req, res, next) => {
  try {
    const id = req.params.id
    const body = req.body;
    const { error } = await validation.updateStatus.validate(body);
    if (error) {
      return commonHelper.sendErrorResponse(res, responseCode.validation.code, 'fail', responseCode.validation.msg, error.details.map((err) => err.message));
    }
    body.createdby = req.user.userid;
    let result = await dao.updateStatus({ db, validation })(body, req, id);
    if (result) {
      return commonHelper.sendSuccessResponse(res, 200, 'success', validation.messages.statusupdate);
    } else {
      return commonHelper.sendSuccessResponse(res, 200, 'fail', validation.messages.no_data);
    }
  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
}

const changeProfile = ({ dao, db,validation}) => async (req, res,next) => {
  let imgpath='';
  try {
      req.params.folder_name = "studentimage";
      req.params.uploadtype = "images";
      await uploadFileMiddleware(req, res);
      if(req.files && req.files.length > 0){
        req.body.files = req.files.map((file)=> req.params.folder_name+'/'+file.filename);
        imgpath = req.body.files[0];
      }
      let body=req.body;   
      body.image = imgpath;
      body.createdby=req.user.userid;
      let result = await dao.changeProfile({ db ,validation})(body,req);
      if(result.status){
        return commonHelper.sendSuccessResponse(res,responseCode.success.code,'success',result.message);
      }else{ 
        commonHelper.fileUnlink(imgpath);
        return commonHelper.sendErrorResponse(res,responseCode.success.code,'fail',result.message);
      }
  }catch (error) {
    commonHelper.fileUnlink(imgpath);
    console.log('checklogin err==>>', error); next(error);
  }
};



module.exports = {
  getAll,
  getById,
  save,
  update,
  deleteById,
  importRecord,
  test,
  getSampleFile,
  getImportFailedList,
  exportFailedImportList,
  columnEncryptionDecryption,
  updateStatus,
  changeProfile
  
}

