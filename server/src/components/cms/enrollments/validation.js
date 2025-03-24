const joi = require("joi");

const schema = joi.object({
  // type: joi.required().messages({
  //   "any.required": `type is a required.`,
  // }),
  first_name: joi.required().messages({
    "any.required": `First_name is required.`,
  }),
  last_name: joi.required().messages({
    "any.required": `Last_name is required.`,
  }),
  country_id: joi.required().messages({
    "any.required": `Country is required.`,
  }),
  state_id: joi.required().messages({
    "any.required": `State is required.`,
  }),
  city_id: joi.required().messages({
    "any.required": `City is required.`,
  }),
  status: joi.required().messages({
    "any.required": `Status is required`,
  }),
});

const messages = {
  add_success: `Student created successfully`,
  update_success: `Student updated successfully`,
  something_wrong_try_later: `Something went wrong. Please try again later`,
  studentname_duplicate: `Student name already exists`,
  not_updated: `Student not found or not updated`,
  status_change: "Status changed successfully",
  record_delete: "Record Delete successfully",
};

module.exports = {
  schema,
  messages,
};
