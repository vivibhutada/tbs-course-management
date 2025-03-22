const joi = require('joi');

const schema = joi.object({
      // type: joi.required().messages({
      //   "any.required": `type is a required.`,
      // }), 
      name: joi.required().messages({
        "any.required": `Name is a required.`,
      }), 
      position: joi.required().messages({
        "any.required": `Position is a required.`,
      }),   
      salary: joi.required().messages({
        "any.required": `Salary by is required.`,
      }), 
      status: joi.required().messages({
        "any.required": `Status is Required`,
      }),
});

const messages = {
  'add_success':  `Employee created successfully`,
  'update_success':  `Employee updated successfully`,
  'something_wrong_try_later':  `Something went wrong. Please try again later`,
  'employeename_duplicate':  `Employee's name already exists`,
  'not_updated':  `Employee not found or not updated`,
  'status_change' : "Status changed successfully",
  'record_delete' : "Record Delete successfully"
};

module.exports = {
    schema,
    messages
}