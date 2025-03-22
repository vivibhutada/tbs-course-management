  const getAll = ({ db }) =>  async () => {
    let [res] = await db.sequelize.query(`select * from mst_countries where deletedon is null`);
      return res;
  }
  const getById = ({ db }) =>  async (id) => {
    let [res] = await db.sequelize.query('select * from mst_countries where country_id=:_id', {
      replacements: {
        _id: id
      },
      type: db.sequelize.QueryTypes.SELECT
    });
      return res;
  }
  
  const save = ({ db, validation }) => async (body, req) => {
    const userId = req?.user?.userid;
    if (body.id) {
      // Update existing record
      try {
            let duplicate = await checkDuplicate({ db ,validation})(body,req);
            if(duplicate == 1){
                return {
                    status: false,
                    errors: [validation.messages.name_duplicate],
                };
            }else if (duplicate == -1){
                return {
                    status: false,
                    errors: [validation.messages.something_wrong_try_later],
                };
            }
            let query = `UPDATE mst_countries SET name = ?, code = ?,status = ?,modifiedby = ?,modifiedon = CURRENT_TIMESTAMP WHERE country_id = ?;`;
            try {
            let result = await db.sequelize.query(query, {replacements: [body.name, body.code, body.status,userId,body.id]});
    
            if (result) {
                return { status: true , message: validation.messages.update_success};
            } else {
                return { status: false, errors: [validation.messages.not_updated] };
            }
            } catch (error) {
            console.log("updateFeature error==>>", error);
            return { status: false };
            }
      } catch (error) {
        console.log("line 46");
        console.log("updateFaq error:", error);
        return { status: false };
      } 
    } else {
      
   
      
        try {
            // check duplicate 
            body.action="Create";
            let duplicate = await checkDuplicate({ db ,validation})(body,req);
            if(duplicate == 1){
                return {
                    status: false,
                    errors: [validation.messages.name_duplicate],
                };
            }else if (duplicate == -1){
                return {
                    status: false,
                    errors: [validation.messages.something_wrong_try_later],
                };
            }
            

            // Create new record
            let query = `INSERT INTO mst_countries(name,code,status,createdby,createdon)VALUES (?, ?, ?, ?,CURRENT_TIMESTAMP);`;  
            let result = await db.sequelize.query(query, {replacements: [body.name,body.code,body.status,userId]});
            if (result) {
                return { status: true ,message: validation.messages.add_success };
            } else {
                return {
                status: false,
                errors: [validation.messages.something_wrong_try_later],
                };
            }
        } catch (error) {
          console.log("addFeature error==>>", error);
          return { status: false };
        }
    }
  };

  const checkDuplicate = ({ db, validation }) => async (body, req) => {

    try {
        let duplicate = 0;
        if(body.action === "Create"){
            let query = `SELECT * FROM mst_countries WHERE name = ? OR code = ?;`;
            let result = await db.sequelize.query(query, { replacements: [body.name, body.code] });
            if(result[0].length > 0){
                duplicate = 1;
            }
        }else{
            let query = `SELECT * FROM mst_countries WHERE country_id != ? and (name = ? OR code = ?);`;
            let result = await db.sequelize.query(query, { replacements: [body.id, body.name, body.code] });
            console.log(result);
            if(result[0].length > 0){
                duplicate = 1;
            }
        }
        return duplicate

    } catch (error) {
        
        return -1; 
    }

  }
  
  const deleteById = ({ db }) =>  async (id=null) => {
    let [res] = await db.sequelize.query(`UPDATE mst_countries set status='Inactive', deletedon=now() where country_id=:_id`, {
      replacements: {
          _id: id
      }
    });
      return res;
  }
  
  module.exports = {
    getAll,
    save,
    deleteById,
    getById
  }