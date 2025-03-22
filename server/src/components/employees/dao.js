const getAll =
  ({ db }) =>
  async () => {
    let [res] = await db.sequelize.query(
      `select * from vaishnavi_employees`
    );
    return res;
  };

const getById =
  ({ db }) =>
  async (id) => {
    let [res] = await db.sequelize.query(
      "select * from vaishnavi_employees where id=:_id",
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
        let query = `UPDATE vaishnavi_employees SET name = ?, position = ?, salary = ?, modifiedby = ?, modifiedon = CURRENT_TIMESTAMP WHERE id = ?;`;
        try {
          let result = await db.sequelize.query(query, {
            replacements: [body.name, body.position, body.salary, "101"],
          });

          if (result) {
            return { status: true };
          } else {
            return { status: false };
          }
        } catch (error) {
          console.log("updateEmployee error==>>", error);
          return { status: false };
        }
      } catch (error) {
        console.log("updateEmployee error:", error);
        return { status: false };
      }
    } else {
      // Create new record
      let query = `INSERT INTO vaishnavi_employees(name, position, salary, status, createdby, createdon)VALUES (?, ?, ?, ?, ?,CURRENT_TIMESTAMP);`;
      try {
        let result = await db.sequelize.query(query, {
          replacements: [
            body.name,
            body.position,
            body.salary,
            body.status,
            "vivi",
            // userId,
          ],
        });
        if (result) {
          return { status: true };
        } else {
          return { status: false };
        }
      } catch (error) {
        console.log("addEmployee error==>>", error);
        return { status: false };
      }
    }
  };

const deleteById =
  ({ db }) =>
  async (id = null) => {
    let [res] = await db.sequelize.query(
      `UPDATE vaishnavi_employees set status='Inactive', deletedon=now() where id=:_id`,
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

// // models/Employee.js
// const { DataTypes } = require('sequelize');
// const sequelize = require('../../db');

// // Define the Employee model
// const Employee = sequelize.define('Employee', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   position: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   salary: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
// }, {
//   tableName: 'employees',  // The name of the table
//   timestamps: false,       // Disable timestamps (createdAt/updatedAt)
// });

// module.exports = Employee;
