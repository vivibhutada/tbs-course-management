const getAll =
  ({ db }) =>
  async () => {
    // Fetching all students along with their trainer information
    let [res] = await db.sequelize.query(
      `SELECT student_enrollments.*, student_enrollments.id, students_master.first_name, courses_master.name, student_enrollments.course_fees
      FROM student_enrollments
      JOIN students_master ON student_enrollments.student_id = students_master.id 
      JOIN courses_master ON student_enrollments.course_id = courses_master.id
      WHERE student_enrollments.is_deleted='No'`
    );
    return res;
  };

const getById =
  ({ db }) =>
  async (id) => {
    // Fetching a specific student by ID along with the trainer's name
    let [res] = await db.sequelize.query(
      `SELECT student_enrollments.id, students_master.first_name, courses_master.name, student_enrollments.course_fees
      FROM student_enrollments
      JOIN students_master ON student_enrollments.student_id = students_master.id 
      JOIN courses_master ON student_enrollments.course_id = courses_master.id
      WHERE student_enrollments.id = :_id`,
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
          UPDATE student_enrollments
          SET course_fees = ?, modified = CURRENT_TIMESTAMP
          WHERE id = ?;
        `;
        let result = await db.sequelize.query(query, {
          replacements: [
            body.course_fees,
            body.id,
          ],
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
        INSERT INTO student_enrollments (student_id, course_id, course_fees, order_amount, discount_amount, payment_type, payable_amount, balance_amount, remarks, status, created, modified) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP, NULL);
      `;
      try {
        let result = await db.sequelize.query(query, {
          replacements: [
            body.student_id,
            body.course_id,
            body.course_fees,
            body.order_amount,
            body.discount_amount,
            body.payment_amount,
            body.payment_type,
            body.payable_amount,
            body.balance_amount,
            body.remarks,
            body.status,
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
      `UPDATE student_enrollments SET status = 'Inactive', is_deleted = 'Yes' WHERE id = ?;`,
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
