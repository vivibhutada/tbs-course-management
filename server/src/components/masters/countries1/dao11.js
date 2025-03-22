// const getAll =
//   ({ db }) =>
//   async () => {
//     let [res] = await db.sequelize.query(
//       `SELECT vaishnavi_countries.id, vaishnavi_countries.country_name, vaishnavi_countries.status FROM vaishnavi_countries`
//     );
//     return res;
//   };

// const getById =
//   ({ db }) =>
//   async (id) => {
//     let [res] = await db.sequelize.query(
//       `SELECT vaishnavi_countries.id, vaishnavi_countries.country_name, vaishnavi_countries.status FROM vaishnavi_countries WHERE vaishnavi_countries.id = :_id`,
//       {
//         replacements: {
//           _id: id,
//         },
//         type: db.sequelize.QueryTypes.SELECT,
//       }
//     );
//     return res;
//   };

// const save =
//   ({ db }) =>
//   async (body, req) => {
//     // const userId = req?.user?.userid;
//     if (body.id) {
//       // Update existing record
//       try {
//         let query = `UPDATE vaishnavi_countries SET country_name = ?, modifiedby = ?, modifiedon = CURRENT_TIMESTAMP WHERE id = ?;`;
//         try {
//           let result = await db.sequelize.query(query, {
//             replacements: [body.country_name, "1001", body.id],
//           });

//           if (result) {
//             return { status: true };
//           } else {
//             return { status: false };
//           }
//         } catch (error) {
//           console.log("updateCountry error==>>", error);
//           return { status: false };
//         }
//       } catch (error) {
//         console.log("updateCountry error:", error);
//         return { status: false };
//       }
//     } else {
//       // Create new record
//       let query = `INSERT INTO vaishnavi_countries(country_name, status, createdby, createdon)VALUES (?, ?, ?,CURRENT_TIMESTAMP);`;
//       try {
//         let result = await db.sequelize.query(query, {
//           replacements: [
//             body.country_name,
//             body.status,
//             "1001",
//             // userId,
//           ],
//         });
//         if (result) {
//           return { status: true };
//         } else {
//           return { status: false };
//         }
//       } catch (error) {
//         console.log("addCountry error==>>", error);
//         return { status: false };
//       }
//     }
//   };

// const deleteById =
//   ({ db }) =>
//   async (id = null) => {
//     let [res] = await db.sequelize.query(
//       `UPDATE vaishnavi_countries set status='Inactive' where id=:_id`,
//       {
//         replacements: {
//           _id: id,
//         },
//       }
//     );
//     return res;
//   };

// module.exports = {
//   getAll,
//   save,
//   deleteById,
//   getById,
// };
