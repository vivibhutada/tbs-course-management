const joi = require('joi');

const schema = joi.object({
      // type: joi.required().messages({
      //   "any.required": `type is a required.`,
      // }),    
      city_name: joi.required().messages({
        "any.required": `CityName is required.`,
      }), 
      status: joi.required().messages({
        "any.required": `Status is required`,
      }),
});

const messages = {
  'add_success':  `City created successfully`,
  'update_success':  `City updated successfully`,
  'something_wrong_try_later':  `Something went wrong. Please try again later`,
  'cityname_duplicate':  `City's name already exists`,
  'not_updated':  `City not found or not updated`,
  'status_change' : "Status changed successfully",
  'record_delete' : "Record Delete successfully"
};

module.exports = {
    schema,
    messages
}