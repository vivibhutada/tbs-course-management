const getAll =
  ({ db }) =>
  async () => {
    // Fetching all Countries along with their trainer information
    let [res] = await db.sequelize.query(
      `SELECT countries_master.country_name, countries_master.status FROM countries_master WHERE countries_master.is_deleted='No'`
    );
    return res;
  };

const getById =
  ({ db }) =>
  async (id) => {
    // Fetching a specific Country by ID along with the trainer's name
    let [res] = await db.sequelize.query(
      `SELECT countries_master.id, countries_master.country_name FROM countries_master WHERE countries_master.id = :_id`,
      {
        replacements: { _id: id },
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    return res;
  };

const save =
  ({ db, validation }) =>
  async (body, req) => {
    // Assuming userId may come from the request object, use it if required for update operations
    // const userId = req?.user?.userid;

    if (body.id) {
      // Update existing Country record
      try {
        let query = `
          UPDATE countries_master
          SET country_name = ?, modified = CURRENT_TIMESTAMP
          WHERE id = ?;
        `;
        let result = await db.sequelize.query(query, {
          replacements: [body.first_name, body.last_name, body.id],
        });

        if (result) {
          return { status: true, message: validation.messages.update_success };
        } else {
          return { status: false, errors: [validation.messages.not_updated] };
        }
      } catch (error) {
        console.log("updateCountry error==>>", error);
        return { status: false, errors: ["Update failed"] };
      }
    } else {
      // Create new Country record
      let query = `
        INSERT INTO countries_master (country_name, created, modified) 
        VALUES (?, CURRENT_TIMESTAMP, NULL);
      `;
      try {
        let result = await db.sequelize.query(query, {
          replacements: [
            body.country_name
          ],
        });

        if (result) {
          return { status: true, message: validation.messages.add_success };
        } else {
          return {
            status: false,
            errors: [validation.messages.something_wrong_try_later],
          };
        }
      } catch (error) {
        console.log("addCountry error==>>", error);
        return { status: false, errors: ["Add failed"] };
      }
    }
  };

const deleteById =
  ({ db }) =>
  async (id) => {
    // Deactivating the Country instead of deleting it
    let [res] = await db.sequelize.query(
      `UPDATE countries_master SET status = 'Inactive', is_deleted = 'Yes' WHERE id = ?;`,
      {
        replacements: [id],
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
