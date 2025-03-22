
const responseCode = require('../../../config/responseCode');
const { log } = require('console');
const fs= require("fs");

const getAll = ({ dao, db,validation}) => async (req, res) => {
  
  try {
    const result = await dao.getAll({ db,validation })();
    if(result.roles.length > 0){
      return commonHelper.sendSuccessResponse(res, 200, 'success',validation.messages.list, result);
    }else{
      return commonHelper.sendSuccessResponse(res, 200, 'fail',validation.messages.no_data, result);
    }
  } catch (error) {
  
    return commonHelper.sendErrorResponse(res,responseCode.serverError.code,'fail',responseCode.serverError.msg,error.message);
   
  }
};



module.exports = {
  getAll,
}

