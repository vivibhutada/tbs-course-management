const joi = require("joi");

const schema = joi.object({
  // type: joi.required().messages({
  //   "any.required": `type is a required.`,
  // }),
  country_name: joi.required().messages({
    "any.required": `Country name is required.`,
  }),
});

const messages = {
  add_success: `Country created successfully`,
  update_success: `Country updated successfully`,
  something_wrong_try_later: `Something went wrong. Please try again later`,
  countryname_duplicate: `Country name already exists`,
  not_updated: `Country not found or not updated`,
  status_change: "Status changed successfully",
  record_delete: "Record Delete successfully",
};

module.exports = {
  schema,
  messages,
};
