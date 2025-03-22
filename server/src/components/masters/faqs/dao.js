const getAll = ({ db }) =>  async () => {
  let [res] = await db.sequelize.query(`select * from mst_faqs where deletedon is null`);
    return res;
}
const getById = ({ db }) =>  async (id) => {
  let [res] = await db.sequelize.query('select * from mst_faqs where faq_id=:_id', {
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

      let query = `UPDATE mst_faqs SET type = ?, question = ?,answer = ?,order_by = ?,status = ?,modifiedby = ?,modifiedon = CURRENT_TIMESTAMP WHERE faq_id = ?;`;
      try {
        let result = await db.sequelize.query(query, {replacements: [body.type, body.question, body.answer,body.order_by,body.status,userId,body.id]});

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
      console.log("updateFaq error:", error);
      return { status: false };
    } 
  } else {
    // Create new record
    let query = `INSERT INTO mst_faqs(question, answer, order_by, status, type, createdby,createdon)VALUES (?, ?, ?, ?, ?, ?,CURRENT_TIMESTAMP);`;
      try {
        let result = await db.sequelize.query(query, {replacements: [body.question, body.answer, body.order_by,body.status, body.type, userId]});
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

const deleteById = ({ db }) =>  async (id=null) => {
  let [res] = await db.sequelize.query(`UPDATE mst_faqs set status='Inactive', deletedon=now() where faq_id=:_id`, {
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