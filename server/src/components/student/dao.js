const { exist } = require("joi");
const { limit } = require('../../config/constant');

const getAll = ({ db, validation }) => async (body) => {

  try {
    const show_limit = body.limit || limit;

    const page = body.page || 1;

    if (!Number.isInteger(show_limit) || show_limit <= 0) {
      throw new Error('Limit must be a positive number.')
    }

    if (!Number.isInteger(page) || page <= 0) {
      throw new Error('Page must be a positive number.')
    }

    const validOrderByFields = [
      "id", "roll_no", "firstname", "middlename", "lastname", "dob", "gender", "mobile_no", "adhar_no", "pan_no", "address"
    ];

    const orderBy = body.orderBy || 'id';
   
    if (!validOrderByFields.includes(orderBy)) {
      throw new Error(`Invalid orderBy field: ${orderBy}. Valid fields are: ${validOrderByFields.join(', ')}`);
    }

    const orderDirection = body.orderDirection || 'DESC';

    const conditions = [];
    const replacements = [];
    body = await checkColumnEncyption({ validation })(body, 'encrypt');
    
    if (body.roll_no && body.roll_no.trim() !== '') {
      conditions.push("roll_no LIKE ?")
      replacements.push(`%${body.roll_no}%`);
    }
    if (body.firstname && body.firstname.trim() !== '') {
      conditions.push("firstname LIKE ?");
      replacements.push(`%${body.firstname}%`);
    }
    if (body.middlename && body.middlename.trim() !== '') {
      conditions.push("middlename LIKE ?");
      replacements.push(`%${body.middlename}%`);
    }
    if (body.lastname && body.lastname.trim() !== '') {
      conditions.push("lastname LIKE ?");
      replacements.push(`%${body.lastname}%`);
    }
    if (body.dob && body.dob.trim() !== '') {
      body.dob = commonHelper.convertToSysDateFormat(body.dob);
      conditions.push("dob LIKE ?");
      replacements.push(`%${body.dob}%`);
    }
    if (body.gender && body.gender.trim() !== '') {
      conditions.push("gender = ?");
      replacements.push(body.gender.trim());
    }
    if (body.mobile_no && body.mobile_no.trim() !== '') {
      //enc_mob = commonHelper.valueEncryption(String(body.mobile_no));

      conditions.push("mobile_no LIKE ?");
      replacements.push(`%${body.mobile_no}%`);
    }
    if (body.status && body.status.trim() !== '') {
      conditions.push("status LIKE ?");
      replacements.push(`%${body.status}%`);
    }
    if (body.adhar_no && body.adhar_no.trim() !== '') {
      conditions.push("adhar_no LIKE ?");
      replacements.push(`%${body.adhar_no}%`);
    }
    if (body.pan_no && body.pan_no.trim() !== '') {
      conditions.push("pan_no LIKE ?");
      replacements.push(`%${body.pan_no}%`);
    }
    if (body.address && body.address.trim() !== '') {
      conditions.push("address LIKE ?");
      replacements.push(`%${body.address}%`);
    }

    //combine conditions into whereclause
    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")} AND deleteon IS NULL` : `WHERE deleteon IS NULL`;

    const offset = (page - 1) * show_limit;

    const validOrderDirection = ['ASC', 'DESC'];

    if (!validOrderDirection.includes(orderDirection.toUpperCase())) {
      orderDirection = 'DESC';
    }

    let [res] = await db.sequelize.query(`SELECT * FROM students  ${whereClause} ORDER BY ${orderBy} ${orderDirection} LIMIT ? OFFSET ?`,
      {
        replacements: [...replacements, show_limit, offset],
        type: db.sequelize.QueryTypes.SELECTALL
      });

    const [totalCountResult] = await db.sequelize.query(`SELECT COUNT(*) as count FROM students  ${whereClause}`,
      {
        replacements,
        type: db.sequelize.QueryTypes.SELECTALL
      });

    const totalCount = totalCountResult[0].count;
    const totalPages = Math.ceil(totalCount / show_limit);


    res = await Promise.all
      (
        res.map(async (student) => {
          student.id = commonHelper.valueEncryption(String(student.id));
          student.dob = commonHelper.convertToUserDateFormat(student.dob);
          student.imageurl = student.image != '' && student.image != null ? commonHelper.generateFilelink(student.image) : '';
          student.image;
          student = await checkColumnEncyption({ validation })(student, 'decrypt');
          return student;
        })
      );

    let pagination = {
      totalCount: totalCount,
      totalPages: totalPages,
      currentPage: page,
      limit: show_limit,
      // offset: offset,
      // orderBy: orderBy,
      // orderDirection: orderDirection
    }
    return {
      students: res,
      pagination: pagination
    };
  } catch (error) {
    throw new Error(error.message);
  }

};


const getById = ({ db,validation}) =>  async (id) => {
    id =  await commonHelper.valueDecryption(String(id));
    
    let [res] = await db.sequelize.query('select * from students where id=:_id', {
      replacements: {
        _id:id
      },
      type: db.sequelize.QueryTypes.SELECT
    });
    if(res){
      res.id = commonHelper.valueEncryption(String(res.id));
      res.imageurl = res.image != '' &&  res.image != null ? commonHelper.generateFilelink(res.image):'';
      delete res.image;
      res.dob =  commonHelper.convertToUserDateFormat(res.dob);
      res = await checkColumnEncyption({validation})(res,'decrypt');
      return  {students: res };
    }else{
      return  false;
    }
    
    
}
const save = ({ db, validation }) => async (body, req) => {
    try {
        body.id = 0;
        body.dob = commonHelper.convertToSysDateFormat(body.dob);
        body.firstname=commonHelper.titleCase(body.firstname);
        body.middlename = body.middlename ? commonHelper.titleCase(body.middlename) : null;
        body.lastname=commonHelper.titleCase(body.lastname);
        
        body = await checkColumnEncyption({validation})(body,'encrypt');
        let duplicate = await checkDuplicate({ db,validation})(body,req);
        if(duplicate.status){
          return { status: false ,message: duplicate.message };
        }
        
        let query = `INSERT INTO students(roll_no,firstname,middlename,lastname,dob,gender,mobile_no,createdby,adhar_no,pan_no,image,address,createdon)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`;  
        let result = await db.sequelize.query(query, {replacements: [
          body.roll_no,
          body.firstname,
          body.middlename,
          body.lastname,
          body.dob,
          body.gender,
          body.mobile_no,
          body.createdby,
          body.adhar_no,
          body.pan_no,
          body.image,
          body.address,
        ]});
        if(result){
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

    let existingImage = '';
    let image = '';
    body.firstname = commonHelper.titleCase(body.firstname);
    body.middlename = body.middlename ? commonHelper.titleCase(body.middlename) : null;
    body.lastname = commonHelper.titleCase(body.lastname);

    body.id = commonHelper.valueDecryption(String(body.id));
    body = await checkColumnEncyption({ validation })(body, 'encrypt');
    let duplicate = await checkDuplicate({ db, validation })(body, req);
    if (duplicate.status) {
      return { status: false, message: duplicate.message };
    }

    body.dob = commonHelper.convertToSysDateFormat(body.dob);
    let [res] = await db.sequelize.query('select * from students where id=:_id', {
      replacements: {
        _id: body.id
      },
      type: db.sequelize.QueryTypes.SELECT
    });

    if (res && res.image !== null && res.image !== undefined && res.image !== '') { existingImage = res.image }
    if (body.image == null || body.image == undefined || body.image == '') {
      image = existingImage;
    } else {
      image = body.image;
    }


    let query = `UPDATE students SET roll_no = ?,firstname = ?,middlename = ?,lastname = ?, dob = ?,gender = ?,mobile_no = ?,modifiedby = ?,adhar_no = ?,pan_no = ?,image = ?,address = ?, modifiedon = CURRENT_TIMESTAMP WHERE id = ?`;

    let result = await db.sequelize.query(query, {
      replacements: [
        body.roll_no,
        body.firstname,
        body.middlename,
        body.lastname,
        body.dob,
        body.gender,
        body.mobile_no,
        body.createdby,
        body.adhar_no,
        body.pan_no,
        image,
        body.address,
        body.id
      ]
    });

    const [updateResult] = result;

    if (updateResult.affectedRows > 0) {

      let changes = [];
      if (body.image == '') {
        delete (res.image);
        delete (body.image);

      } else {
        delete (body.files);
      }
      let masterLogDetails = {
        "tablename": "students",
        "id": body.id,
        "modified_by": body.createdby,
        "modified_by_name": req.user.firstname + " " + req.user.lastname,

      }
      await commonHelper.masterLogInsertion({ db })(body, res, masterLogDetails);

      if (body.image !== null && body.image !== undefined && body.image !== '' && existingImage !== null && existingImage !== undefined && existingImage !== '') {
        await commonHelper.fileUnlink(existingImage)
      }
      return { status: true, message: validation.messages.record_updated };
    }
    else if (updateResult.affectedRows > 0 && updateResult.changedRows === 0) {

      return { status: false, message: validation.messages.record_updated_with_no_change };
    }
    else {

      return { status: false, message: validation.messages.no_record_with_givenId };
    }
  } catch (error) {
    throw error;
  }
};

const checkDuplicate = ({ db, validation }) => async (body, req) => {
    
    try {
        let status = false;
        let msg = '';
        let query = `SELECT roll_no,mobile_no, adhar_no, pan_no FROM students WHERE id != ? AND (roll_no = ? OR mobile_no = ? OR adhar_no = ? OR pan_no = ?);`;
        let result = await db.sequelize.query(query, { replacements: [
          body.id,
          body.roll_no,
          body.mobile_no,
          body.adhar_no,
          body.pan_no,
        ],type: db.sequelize.QueryTypes.SELECT});
        if(result && result.length> 0){
          result.forEach((record) => {
              if (record.mobile_no === body.mobile_no) {
                msg += validation.messages.dp_mob;
              }
              if (record.adhar_no === body.adhar_no) {
                msg += validation.messages.dp_adhar;
              }
              if (record.pan_no === body.pan_no) {
                msg += validation.messages.dp_pan;
              }
              if (record.roll_no == body.roll_no) {
                msg += validation.messages.dp_rollno;
              }
          });
          status= true ;
        }
        return { status: status , message: msg}
        
    } catch (error) {
       throw error;
    }

}
  
const deleteById = ({ db, validation }) =>  async (body) => {
  try {
    id =  await commonHelper.valueDecryption(String(body.id));
    //  
    await db.sequelize.query('SET @userId = :userId', {
      replacements: { userId:body.userid }
    });

    let del = await db.sequelize.query('delete from students where id=:_id', {
      replacements: {
        _id:id
      }
    });
    const [updateResult] = del;
    if(updateResult.affectedRows > 0){
      return { status: true ,message: validation.messages.deleted};
    }
    else{
      return { status: false ,message: validation.messages.no_record_with_givenId}; // no record with this id
    }
  } catch (error) {
     throw error;
  }
}
const checkColumnEncyption = ({validation }) => async(body,flag) => {
    return body = await validation.encryptedColumns.reduce((updatedBody, column) => {
            if (column in body) {
                if(flag == 'encrypt'){
                  updatedBody[column] =  body[column].trim() !== '' ? commonHelper.valueEncryption(body[column]) : body[column];
                }else{
                  updatedBody[column] =  body[column].trim() !== '' ? commonHelper.valueDecryption(body[column]): body[column];
                }
                  
            }
            return updatedBody;
    }, { ...body });
  
}

const importFailRecordInsert = ({ db, validation }) => async (body, req) => {
  try {
      
      body.dob = commonHelper.convertToSysDateFormat(body.dob);
      body.firstname=commonHelper.titleCase(body.firstname);
      body.middlename = body.middlename ? commonHelper.titleCase(body.middlename) : null;
      body.lastname=commonHelper.titleCase(body.lastname);
      
      let query = `INSERT INTO studentimportemp(roll_no,firstname,middlename,lastname,dob,gender,mobile_no,createdby,adhar_no,pan_no,address,remark,createdon)VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP);`;  
      let result = await db.sequelize.query(query, {replacements: [
        body.roll_no,
        body.firstname,
        body.middlename,
        body.lastname,
        body.dob,
        body.gender,
        body.mobile_no,
        body.createdby,
        body.adhar_no,
        body.pan_no,
        body.address,
        body.remark,
      ]});
      if(result){
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

const deleteImportTempData = ({db}) =>  async (userId) => {
  try {
    
    let del = await db.sequelize.query('delete from studentimportemp where createdby=:userId', {
      replacements: {
        userId
      }
    });
  } catch (error) {
     throw error;
  }
}

const getImportFailRecord = ({ db}) => async (userId) => {
  
  let [res] = await db.sequelize.query(`SELECT * FROM studentimportemp WHERE createdby=:userId`,{
    replacements: {
      userId
    }
  });
  // Use Promise.all to handle async operations in map
  res = await Promise.all(
      res.map(async (student) => {
          student.dob =  commonHelper.convertToUserDateFormat(student.dob);
          return student ;
      })
  );
  return  {failedRecords: res};
};

const updateStatus = ({ db, validation }) => async (body, req, id) => {
  try {
    id = await commonHelper.valueDecryption(String(id));
    let [res] = await db.sequelize.query('select status,createdby from students where id=:_id', {
      replacements: {
        _id: id
      },
      type: db.sequelize.QueryTypes.SELECT
    });

    let [updateResult] = await db.sequelize.query(`UPDATE students SET status = :status  WHERE id=:_id`, {
      replacements: {
        _id: id,
        status: body.status,

      }
    });

    if (updateResult.affectedRows > 0) {


      masterLogDetails =
      {
        "tablename": "students",
        "id": id,
        "modified_by": body.createdby,
        "modified_by_name": req.user.firstname + " " + req.user.lastname,

      }

      await commonHelper.masterLogInsertion({ db })(body, res, masterLogDetails);
      return { status: true, message: validation.messages.statusupdate };
    }
    else {
      return { status: false, message: validation.messages.no_record_with_givenId }; // no record with this id
    }
  } catch (error) {
    throw error;
  }
}

const changeProfile = ({ db, validation }) => async (body, req) => {
  try {
    let image = '';
    body.id = commonHelper.valueDecryption(String(body.id));
    let [res] = await db.sequelize.query('select id,image,createdby from students where id=:_id', {
      replacements: {
        _id: body.id
      },
      type: db.sequelize.QueryTypes.SELECT
    });
    image = body.image;
    let query = `UPDATE students SET image = ?,modifiedby = ? ,modifiedon = CURRENT_TIMESTAMP WHERE id = ? `;
    let result = await db.sequelize.query(query, {
      replacements: [
        image,
        body.createdby,
        body.id
      ]
    });
    const [updateResult] = result;
    if (updateResult.affectedRows > 0) {
      if (body.image == '') {
        delete (res.image);
        delete (body.image);

      } else {
        delete (body.files);
      }
      masterLogDetails =
      {
        "tablename": "students",
        "id": body.id,
        "modified_by": body.createdby,
        "modified_by_name": req.user.firstname + " " + req.user.lastname,

      }


      await commonHelper.masterLogInsertion({ db })(body, res, masterLogDetails);

      await commonHelper.fileUnlink(res.image)
      return { status: true, message: validation.messages.record_updated };
    } else {
      return { status: false, message: validation.messages.no_record_with_givenId };
    }
  } catch (error) {
    throw error;
  }
}
  module.exports = {
    getAll,
    save,
    deleteById,
    getById,
    update,
    importFailRecordInsert,
    deleteImportTempData,
    getImportFailRecord,
    updateStatus,
    changeProfile
  }