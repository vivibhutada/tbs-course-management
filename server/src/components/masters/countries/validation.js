const joi = require('joi');
const schema = joi.object({
      
      name: joi.required().messages({
        "any.required": `Country name is a required.`,
        "string.base": "Country name must be a string."
      }), 
      code: joi.string().regex(/^(\+?\d+)$/).required().messages({
        "any.required": `Country code is a required.`,
        "string.pattern.base": "Country code can only contain numbers and an optional '+' symbol."
      }),
      status: joi.required().messages({
        "any.required": `Status is a required.`,
        
      }),   
}).options({ allowUnknown: true });

const messages = {
  'add_success':  `Record created successfully`,
  'update_success':  `Record updated successfully`,
  'something_wrong_try_later':  `Something went wrong. Please try again later`,
  'name_duplicate':  `Record already exists, country name and code must be unique`,
  'not_updated':  `Record not found or not updated`,
  'status_change' : "Status changed successfully",
  'record_delete' : "Record Delete successfully"
};

module.exports = {
    schema,
    messages
}