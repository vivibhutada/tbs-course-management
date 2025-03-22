const bcrypt = require('bcrypt');
const getAll = ({ db, validation }) => async () => {

  let [res] = await db.sequelize.query(`SELECT userid,loginid,firstname,lastname,email,mobile FROM ad_users WHERE deletedon IS NULL ORDER BY userid DESC`);
  // Use Promise.all to handle async operations in map
  res = await Promise.all(
    res.map(async (user) => {
      user.userid = commonHelper.valueEncryption(String(user.userid));
      return user;
    })
  );
  return { users: res };
};

const save = ({ db, validation }) => async (body, req) => {
  try {
      body.id = 0;
      body.firstname=commonHelper.titleCase(body.firstname);
      body.lastname=commonHelper.titleCase(body.lastname);
      body.email=body.email.toLowerCase();
      body.loginid=body.loginid.toLowerCase();
      
      body.roleid= await getRoleid({ db,validation})(body.roleid);
      body = await checkColumnEncyption({validation})(body,'encrypt');
      let duplicate = await checkDuplicate({ db,validation})(body,req);
      if(duplicate.status){
        return { status: false ,message: duplicate.message };
      }
      body.password = await generatePassword(body.password);
      let query = `INSERT INTO ad_users(orgid,loginid,firstname,lastname,email,mobile,password,createdby,createdon)VALUES (?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`;  
      
      let result = await db.sequelize.query(query, {replacements: [
        1,
        body.loginid,
        body.firstname,
        body.lastname,
        body.email,
        body.mobile,
        body.password,
        body.createdby,
      ]});
      if(result){
        await insertUserRole({db})(result[0],body.roleid, body.createdby,'insert');
        return { status: true ,message: validation.messages.record_added};
      }else{
        return {
        status: false,
        errors: [validation.messages.something_wrong_try_later],
        };
      }
  } catch (error) {
    throw error;
  }
}

const update = ({ db, validation }) => async (body, req) => {
 
  try {
    
    body.userid = commonHelper.valueDecryption(String(body.userid));
    body.id = body.userid;
  
    body.loginid = body.loginid.toLowerCase();
    body.firstname = commonHelper.titleCase(body.firstname);
    body.lastname = commonHelper.titleCase(body.lastname);
    body.email = body.email.toLowerCase();

    body.roleid = await getRoleid({ db, validation })(body.roleid);
   
    // body = await checkColumnEncyption({ validation })(body, 'encrypt');
    
    let duplicate = await checkDuplicate({ db, validation })(body, req);
    
    if (duplicate.status) {
      return { status: false, message: duplicate.message };
    }

    body.password = await generatePassword(body.password);
    
    let query = `UPDATE ad_users SET loginid=?, firstname=?, lastname=?, email=?, mobile=?, password=?,modifiedby=?, modifiedon=CURRENT_TIMESTAMP WHERE userid=?`;
    let result = await db.sequelize.query(query, {
      replacements: [
        body.loginid,
        body.firstname,
        body.lastname,
        body.email,
        body.mobile,
        body.password,
        body.createdby,
        body.userid
      ]
    });
   
   
    const [updateResult] = result;
  
    if (updateResult.affectedRows > 0) {
      console.log( body.roleid);
      await insertUserRole({ db })(body.id, body.roleid, body.createdby,'');
      return { status: true, message: validation.messages.record_updated };
    } else {
      return {
        status: false,
        errors: [validation.messages.something_wrong_try_later],
      };
    }
  } catch (error) {
    throw error;
  }

}


const checkDuplicate = ({ db, validation }) => async (body, req) => {
  try {
      let status = false;
      let msg = '';
      let query = `SELECT  loginid FROM ad_users WHERE userid != ? AND loginid = ? AND deletedon IS NULL ;`;
      let result = await db.sequelize.query(query, { replacements: [
        body.id,
        body.loginid,
      ],type: db.sequelize.QueryTypes.SELECT});
      if(result && result.length> 0){
        status= true ;
        msg = validation.messages.dp_loginid;
      }
      return { status: status , message: msg}
      
  } catch (error) {
     throw error;
  }

}

const checkColumnEncyption = ({validation }) => async(body,flag) => {
  if(validation.encryptedColumns.length == 0){
    return body;
  }
  return body = await validation.encryptedColumns.reduce((updatedBody, column) => {
          if (column in body) {
              if(flag == 'encrypt'){
                updatedBody[column] =  commonHelper.valueEncryption(body[column]);
              }else{
                updatedBody[column] =  commonHelper.valueDecryption(body[column]);
              }
                
          }
          return updatedBody;
  }, { ...body });

}

const getRoleid = ({db,validation }) => async(roleIds) => {
  try {
    roleIds = roleIds.map(id=>
      commonHelper.valueDecryption(id)
   );
    const placeholders = roleIds.map(() => '?').join(', ');
    const query = `SELECT roleid FROM ad_roles WHERE roleid IN (${placeholders}) AND deletedon IS NULL;`;
    // Execute the query with replacements
    const [results] = await db.sequelize.query(query, { replacements: roleIds });
    if(roleIds.length != results.length){
      throw new Error(validation.invalid_role)
    }
    return results.map((row) => row.roleid);
  } catch (error) {
    throw error;
  }
}

const insertUserRole = ({db}) => async(userId,roleId,createdBy,flag) => {
  
  
  try {
    if (!Array.isArray(roleId)) {
      throw new Error('roleId must be an array');
    }
    let deleteQuery = `DELETE FROM ad_userrolemap WHERE userid = ?;`;
    await db.sequelize.query(deleteQuery, { replacements: [userId] });

    let insertQuery = `INSERT INTO ad_userrolemap(orgid,userid,roleid,createdby,createdon)VALUES(?,?,?,?,CURRENT_TIMESTAMP);`;  
    for (const role of roleId) {
      await db.sequelize.query(insertQuery, {
        replacements: [1, userId, role, createdBy],
      });
    }
    return true;
  }catch (error) {
    if(flag == 'insert'){
      let deleteQuery = `DELETE FROM ad_users WHERE userid = ?;`;
      await db.sequelize.query(deleteQuery, { replacements: [userId] });
    }
    throw error;
  } 
}

const generatePassword = async(password) => {
  const saltRounds = 10; // Number of salt rounds
  return  hashedPassword = await bcrypt.hash(password, saltRounds);
}


  module.exports = {
    getAll,
    save,
    update
  }