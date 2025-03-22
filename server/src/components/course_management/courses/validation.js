const joi = require('joi');

const schema = joi.object({
      // type: joi.required().messages({
      //   "any.required": `type is a required.`,
      // }),    
      state_name: joi.required().messages({
        "any.required": `StateName is required.`,
      }), 
      status: joi.required().messages({
        "any.required": `Status is required`,
      }),
});

const messages = {
  'add_success':  `State created successfully`,
  'update_success':  `State updated successfully`,
  'something_wrong_try_later':  `Something went wrong. Please try again later`,
  'statename_duplicate':  `State's name already exists`,
  'not_updated':  `State not found or not updated`,
  'status_change' : "Status changed successfully",
  'record_delete' : "Record Delete successfully"
};

module.exports = {
    schema,
    messages
}