const getAll =
  ({ db }) =>
  async () => {
    let [res] = await db.sequelize.query(
      `SELECT vaishnavi_states.id, vaishnavi_states.state_name, vaishnavi_countries.country_name, vaishnavi_states.status FROM 
       JOIN vaishnavi_countries 
       ON vaishnavi_states.country_id = vaishnavi_countries.id`
    );
    return res;
  };

const getById =
  ({ db }) =>
  async (id) => {
    let [res] = await db.sequelize.query(
      `SELECT vaishnavi_states.id, vaishnavi_states.state_name, vaishnavi_countries.country_name, vaishnavi_states.status FROM vaishnavi_states 
      JOIN vaishnavi_countries 
      ON vaishnavi_states.country_id = vaishnavi_countries.id
      WHERE vaishnavi_states.id = :_id`,
      {
        replacements: {
          _id: id,
        },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    return res;
  };

const save =
  ({ db }) =>
  async (body, req) => {
    // const userId = req?.user?.userid;
    if (body.id) {
      // Update existing record
      try {
        let query = `UPDATE vaishnavi_states SET state_name = ?, modifiedby = ?, modifiedon = CURRENT_TIMESTAMP WHERE id = ?;`;
        try {
          let result = await db.sequelize.query(query, {
            replacements: [body.state_name, "1001", body.id],
          });

          if (result) {
            return { status: true };
          } else {
            return { status: false };
          }
        } catch (error) {
          console.log("updateState error==>>", error);
          return { status: false };
        }
      } catch (error) {
        console.log("updateState error:", error);
        return { status: false };
      }
    } else {
      // Create new record
      let query = `INSERT INTO vaishnavi_states(state_name, country_id, status, createdby, createdon)VALUES (?, ?, ?, ?,CURRENT_TIMESTAMP);`;
      try {
        let result = await db.sequelize.query(query, {
          replacements: [
            body.state_name,
            body.country_id,
            body.status,
            "1001",
            // userId,
          ],
        });
        if (result) {
          return { status: true };
        } else {
          return { status: false };
        }
      } catch (error) {
        console.log("addState error==>>", error);
        return { status: false };
      }
    }
  };

const deleteById =
  ({ db }) =>
  async (id = null) => {
    let [res] = await db.sequelize.query(
      `UPDATE vaishnavi_states set status='Inactive' where id=:_id`,
      {
        replacements: {
          _id: id,
        },
      }
    );
    return res;
  };

module.exports = {
  getAll,
  save,
  deleteById,
  getById,
};
