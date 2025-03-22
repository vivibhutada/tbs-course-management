
const responseCode = require('../../../config/responseCode');
const { log } = require('console');
const fs= require("fs");

const getAll = ({ dao, db,validation}) => async (req, res,next) => {
  
  try {
    const result = await dao.getAll({ db,validation })();
    if(result.users.length > 0){
      return commonHelper.sendSuccessResponse(res, 200, 'success',validation.messages.list, result);
    }else{
      return commonHelper.sendSuccessResponse(res, 200, 'fail',validation.messages.no_data, result);
    }
  } catch (error) {
  
    console.log('checklogin err==>>', error); next(error);
   
  }
};

const save = ({ dao, db,validation}) => async (req, res,next) => {

  try {
      let body=req.body;  
      const { error } = await validation.schema.validate(body);
      if (error) {
        return commonHelper.sendErrorResponse(res,responseCode.validation.code,'fail',responseCode.validation.msg,error.details.map((err) => err.message));
      }
      body.createdby=req.user.userid;
      let result = await dao.save({ db ,validation})(body,req);
      if(result.status){
        return commonHelper.sendSuccessResponse(res,responseCode.success.code,'success',result.message);
      }else{ 
        return commonHelper.sendErrorResponse(res,responseCode.success.code,'fail',result.message);
      }

  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
 
};

const update = ({ dao, db,validation}) => async (req, res,next) => {

  try {
      let body=req.body;  
      const context = { isUpdate: true };
      const { error } = await validation.schema.validate(body,{ context });
      if (error) {
        return commonHelper.sendErrorResponse(res,responseCode.validation.code,'fail',responseCode.validation.msg,error.details.map((err) => err.message));
      }
      body.createdby=req.user.userid;
     
      let result = await dao.update({ db ,validation})(body,req);
      if(result){
        return commonHelper.sendSuccessResponse(res,responseCode.success.code,'success',result.message);
      }else{ 
        return commonHelper.sendErrorResponse(res,responseCode.success.code,'fail',result.message);
      }

  } catch (error) {
    console.log('checklogin err==>>', error); next(error);
  }
 
};





module.exports = {
  getAll,
  save,
  update
}

