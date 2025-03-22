const CommonHelper = require("../../helper/commonHelper");
const { authJwt } = require("../../middleware");
const bcrypt = require('bcrypt');

const checklogin = ({ dao, db, keys, crypto }) =>  async (req, res, next) => { 
  try {
    const { loginid, password,  } = req.body;
    let user = await dao.checklogin({db,keys})({ loginid: loginid, password:password});
    if (user) {
      return commonHelper.sendSuccessResponse(res, 200, 'success', 'OTP has been sent successfully',crypto.cryptoEncrypt(user));
    } else {
      return commonHelper.sendErrorResponse(res, 401, 'fail', 'Invalid Credentials','Invalid Credentials');
    }
  }
  catch (err) { console.log('checklogin err==>>', err); next(err) 
  }
}
const verifylogin = ({ dao, db, keys, crypto }) =>  async (req, res, next) => { 
  try { 
    const { loginid, password,  otp } = req.body;
    let user = await dao.verifylogin({db,keys})({ loginid: loginid, password:password, otp:otp });
    if(user)
    {
      let menuObj = await  dao.userrolemenu({db})({ userid: user.userid });
    
      if(menuObj.menuslugs.length > 0){
      let jwtObj=user; jwtObj.type='User';
      jwtObj.menuslugs = menuObj.menuslugs
      const accessToken =  await authJwt.generateAccessToken(jwtObj);  
      let menus = [{menutitle: "DASHBOARD",Items: menuObj.menuHierarchy }];  
      //return  res.send({ statusCode:200, message:'Login successfully', data:crypto.cryptoEncrypt({accessToken: accessToken, user:user, menus:menus, isAdmin : true })});
      return commonHelper.sendSuccessResponse(res, 200, 'success', 'Login successfully',[{accessToken: accessToken, user:user, menus:menus, isAdmin : true }]);
      
      }
      else{
        let message = 'You do not have permission to log in. Please contact the administrator for assistance.'
        return commonHelper.sendErrorResponse(res, 401, 'fail',message,message);
      }
    }
    else {
      return commonHelper.sendErrorResponse(res, 401, 'fail', 'Invalid Credentials', 'Invalid Credentials');
    }
  }
  catch (err) { console.log('verifylogin err==>>', err); next(err) }
}


module.exports = {
  checklogin,
  verifylogin,
}
  