// const getAll = ({ db }) => async () => {
//     // Fetching all students along with the associated class information
//     let [res] = await db.sequelize.query(`
//       SELECT students_kanak.id, students_kanak.name, students_kanak.dob, students_kanak.contact_number,
//              students_kanak.address, students_kanak.status, students_kanak.created, students_kanak.modified,
//              classes_kanak.class_name
//       FROM students_kanak
//       LEFT JOIN classes_kanak ON students_kanak.class_id = classes_kanak.id
//     `);
//     return res;
//   };

//   const getById = ({ db }) => async (id) => {
//     // Fetching a specific student by ID with class information
//     let [res] = await db.sequelize.query(`
//       SELECT students_kanak.id, students_kanak.name, students_kanak.dob, students_kanak.contact_number,
//              students_kanak.address, students_kanak.status, students_kanak.created, students_kanak.modified,
//              classes_kanak.class_name
//       FROM students_kanak
//       LEFT JOIN classes_kanak ON students_kanak.class_id = classes_kanak.id
//       WHERE students_kanak.id = :_id
//     `, {
//       replacements: { _id: id },
//       type: db.sequelize.QueryTypes.SELECT
//     });
//     return res;
//   };

//   const save = ({ db, validation }) => async (body, req) => {
//     const userId = req?.user?.userid; // Assuming userId comes from the request (if needed)

//     if (body.id) {
//       // Update existing student record
//       try {
//         let query = `
//           UPDATE students_kanak
//           SET name = ?, dob = ?, contact_number = ?, address = ?, class_id = ?, status = ?, modified = CURRENT_TIMESTAMP
//           WHERE id = ?;
//         `;
//         let result = await db.sequelize.query(query, {
//           replacements: [body.name, body.dob, body.contact_number, body.address, body.class_id, body.status, body.id]
//         });

//         if (result) {
//           return { status: true, message: validation.messages.update_success };
//         } else {
//           return { status: false, errors: [validation.messages.not_updated] };
//         }
//       } catch (error) {
//         console.log("updateStudent error==>>", error);
//         return { status: false, errors: ['Update failed'] };
//       }
//     } else {
//       // Create new student record
//       let query = `
//         INSERT INTO students_kanak (name, dob, contact_number, address, class_id, status, created, modified)
//         VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, NULL);
//       `;
//       try {
//         let result = await db.sequelize.query(query, {
//           replacements: [body.name, body.dob, body.contact_number, body.address, body.class_id, body.status]
//         });

//         if (result) {
//           return { status: true, message: validation.messages.add_success };
//         } else {
//           return {
//             status: false,
//             errors: [validation.messages.something_wrong_try_later]
//           };
//         }
//       } catch (error) {
//         console.log("addStudent error==>>", error);
//         return { status: false, errors: ['Add failed'] };
//       }
//     }
//   };

//   const deleteById = ({ db }) => async (id) => {
//     // Deactivating the student instead of deletion
//     let [res] = await db.sequelize.query(`
//       UPDATE students_kanak SET status = 'inactive' WHERE id = ?;
//     `, {
//       replacements: [id]
//     });
//     return res;
//   };

const getAll =
  ({ db }) =>
  async () => {
    // Fetching all students along with their trainer information
    let [res] = await db.sequelize.query(
      `SELECT students_master.first_name, students_master.last_name, countries_master.country_name, states_master.state_name, cities_master.city_name 
      FROM students_master
      JOIN countries_master ON students_master.country_id = countries_master.id
      JOIN states_master ON students_master.state_id = states_master.id
      JOIN cities_master ON students_master.city_id = cities_master.id
      WHERE students_master.is_deleted='No'`
    );
    return res;
  };

const getById =
  ({ db }) =>
  async (id) => {
    // Fetching a specific student by ID along with the trainer's name
    let [res] = await db.sequelize.query(
      `SELECT students_master.id, students_master.first_name, students_master.last_name FROM students_master WHERE students_master.id = :_id`,
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
      // Update existing Student record
      try {
        let query = `
          UPDATE students_master
          SET first_name = ?, last_name = ?, modified = CURRENT_TIMESTAMP
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
        console.log("updateStudent error==>>", error);
        return { status: false, errors: ["Update failed"] };
      }
    } else {
      // Create new Student record
      let query = `
        INSERT INTO students_master (first_name, last_name, country_id, state_id, city_id, created, modified) 
        VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, NULL);
      `;
      try {
        let result = await db.sequelize.query(query, {
          replacements: [
            body.first_name,
            body.last_name,
            body.country_id,
            body.state_id,
            body.city_id,
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
        console.log("addStudent error==>>", error);
        return { status: false, errors: ["Add failed"] };
      }
    }
  };

const deleteById =
  ({ db }) =>
  async (id) => {
    // Deactivating the Student instead of deleting it
    let [res] = await db.sequelize.query(
      `UPDATE students_master SET status = 'Inactive', is_deleted = 'Yes' WHERE id = ?;`,
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
