const getAll =
  ({ db }) =>
  async () => {
    let [res] = await db.sequelize.query(
      `SELECT vaishnavi_countries.id, vaishnavi_countries.country_name, vaishnavi_countries.status FROM vaishnavi_countries`
    );
    return res;
  };

// const getById =
//   ({ db }) =>
//   async (id) => {
//     let [res] = await db.sequelize.query(
//       `SELECT * FROM vaishnavi_states, vaishnavi_countries.id, vaishnavi_countries.country_name 
//       JOIN vaishnavi_countries 
//       ON vaishnavi_states.country_id = vaishnavi_countries.id
//       WHERE vaishnavi_countries.id = :_id`,
//       {
//         replacements: {
//           _id: id,
//         },
//         type: db.sequelize.QueryTypes.SELECT,
//       },
//        country = {
//         id : res[0].
//       }
//     );
//     return res;
//   };

const getById = ({ db }) => async (id) => {
  try {
    const query = `SELECT vaishnavi_states.*, vaishnavi_countries.id AS country_id, vaishnavi_countries.country_name
       FROM vaishnavi_states
       JOIN vaishnavi_countries 
       ON vaishnavi_states.country_id = vaishnavi_countries.id
       WHERE vaishnavi_countries.id = :_id`;
       let res = await db.sequelize.query(query,{
        replacements: { _id: id },
        type: db.sequelize.QueryTypes.SELECT,
      });
      console.log("Full query result:", res);
      if(res && res.length > 0){
        const country = {
          id: res[0].country_id,
          country_name: res[0].country_name,
          status: res[0].status,
          created_at: res[0].createdat,
          modified_at: res[0].modifiedat,
          states:[]
        };
        res.forEach((row)=> {
          country.states.push({
            id:row.id,
            state_name:row.state_name
          })
        })
        console.log("Final country object:", JSON.stringify(country, null, 2));
        return country;
      }else {
        return null;
      }

    const states = res.map(state => ({
      state_id: state.id,
      state_name: state.state_name,
      country_id: state.country_id,
    }));

    return { country, states };
  } catch (error) {
    console.error('Error fetching country and states:', error);
    throw error;
  }
};

const save =
  ({ db }) =>
  async (body, req) => {
    // const userId = req?.user?.userid;
    if (body.id) {
      // Update existing record
      try {
        let query = `UPDATE vaishnavi_countries SET country_name = ?, modifiedby = ?, modifiedon = CURRENT_TIMESTAMP WHERE id = ?;`;
        try {
          let result = await db.sequelize.query(query, {
            replacements: [body.country_name, "1001", body.id],
          });

          if (result) {
            return { status: true };
          } else {
            return { status: false };
          }
        } catch (error) {
          console.log("updateCountry error==>>", error);
          return { status: false };
        }
      } catch (error) {
        console.log("updateCountry error:", error);
        return { status: false };
      }
    } else {
      // Create new record
      let query = `INSERT INTO vaishnavi_countries(country_name, status, createdby, createdon)VALUES (?, ?, ?,CURRENT_TIMESTAMP);`;
      try {
        let result = await db.sequelize.query(query, {
          replacements: [
            body.country_name,
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
        console.log("addCountry error==>>", error);
        return { status: false };
      }
    }
  };

const deleteById =
  ({ db }) =>
  async (id = null) => {
    let [res] = await db.sequelize.query(
      `UPDATE vaishnavi_countries set status='Inactive' where id=:_id`,
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
