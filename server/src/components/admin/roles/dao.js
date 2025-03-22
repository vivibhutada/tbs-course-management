const { exist } = require("joi");

const getAll = ({ db,validation }) => async () => {
  
  let [res] = await db.sequelize.query(`SELECT roleid,rolename,displayname,description FROM ad_roles WHERE deletedon IS NULL ORDER BY roleid DESC`);
  // Use Promise.all to handle async operations in map
  res = await Promise.all(
      res.map(async (role) => {
        role.roleid =  commonHelper.valueEncryption(String(role.roleid));
          return role ;
      })
  );
  return  {roles: res };
};

const getById = ({ db,validation}) =>  async (roleid) => {
  let decryptRoleId =  await commonHelper.valueDecryption(String(roleid));
  
  let [res] = await db.sequelize.query('select * from ad_roles where roleid=:_id', {
    replacements: {
      _id:decryptRoleId
    },
    type: db.sequelize.QueryTypes.SELECT
  });
  if(res){
    res.roleid = commonHelper.valueEncryption(String(res.roleid));
    //res = await checkColumnEncyption({validation})(res,'decrypt');
    return  {roles: res };
  }else{
    return  false;
  }
}


  module.exports = {
    getAll,
    getById
  }