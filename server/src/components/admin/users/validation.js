const joi = require('joi');
const schema = joi.object({
  userid: joi.string()
    .when('$isUpdate', {
      is: true, // Check if it's an update
      then: joi.required().messages({
        'any.required': 'Userid is required.',
        'string.base': 'Userid must be a string.',
        'string.empty': 'Userid cannot be empty.',
      }),
      otherwise: joi.forbidden(), // Disallow the `id` field during creation
  }),
  loginid: joi.string().pattern(/^[^\s]+$/).required().max(100).messages({
    "string.pattern.base": `LoginID should be a type of letters, numbers, and special character without space`,
    "string.empty": `LoginID cannot be an empty`,
    "any.required": `LoginID is a required.`,
    "string.max": `LoginID cannot be longer than 100 characters`,
  }),
  firstname: joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
    .required()
    .messages({
      'any.required': 'First name is required.',
      'string.base': 'First name must be a string.',
      'string.empty': 'First name cannot be empty.',
      'string.pattern.base': 'Invalid First name must contain only alphabetic characters',
    }),
  lastname: joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
    .required()
    .messages({
      'any.required': 'Last name is required.',
      'string.base': 'Last name must be a string.',
      'string.empty': 'Last name cannot be empty.',
      'string.pattern.base': 'Invalid Last name must contain only alphabetic characters',
    }),  
    email: joi.string().email()
    .required()
    .messages({
      'any.required': 'Email is required.',
      'string.email': 'Invalid email format.',
      'string.empty': 'Email cannot be empty.',
    }),
    mobile: joi.string().pattern(/^[6-9]\d{9}$/).max(10).required().messages({
      "any.required": `Mobile no is Required`,
      "string.pattern.base": `Mobile number is not valid`,
      "string.empty": `Mobile number cannot be an empty`,
      "string.max": `Mobile number must be exactly 10 digits`,
  
    }),
    password: joi.string().pattern(/^[^\s]+$/).min(6).max(30).required().messages({
      "string.pattern.base": `Password should be a type of letters, numbers, and special character without space`,
      "string.empty": `Password cannot be an empty`,
      "string.min": `Password must be at least 6 characters long`,
      "string.max": `Password must not exceed 30 characters long`,
      "any.required": `Password is a required.`,
    }),
  
    confirmpassword: joi.string().valid(joi.ref('password')).required().messages({
      "any.only": `Confirm Password must match Password`,
      "string.empty": `Confirm Password cannot be an empty`,
      "any.required": `Confirm Password is a required.`,
    }),        
    roleid: joi.array().items(joi.string().required()).required().messages({
      "any.required": `Role id is required.`,
      "array.base": `Role id should be an array.`,
      "array.includesRequiredUnknowns": `Role id array must contain only strings.`,
    }),
}).options({ 
  allowUnknown: true,
  abortEarly: false // Ensures all errors are returned
});

const deleteSchema = joi.object({
  id: joi.string()
    .required()
    .messages({
      'any.required': 'Id is required.',
      'string.base': 'Id must be a string.',
      'string.empty': 'Id cannot be empty.',
    }),
}).options({
  allowUnknown: true,
  abortEarly: false // Ensures all errors are returned
});
const messages = {
  "dp_loginid":"loginid already exists. ",
  "record_added":"Record added successfully. ",
  "no_data":"No Data Found.",
  "list":"Stiudents List",
  "record_updated":"Record updated successfully",
  "record_updated_with_no_change":"Record matched but no changes were made",
  "no_record_with_givenId":"No record matched the given ID",
  "deleted":"Record deleted successfully",
  "not_deleted":"Some thing went wrong record can be deleted please contact to admin",
  "no_file_uploaded":"File Not Found",
  "export_fail_file":"List of failed record while import",
  "invalid_role":"Invalid role id",
};

const encryptedColumns = [];

module.exports = {
  schema,
  messages,
  encryptedColumns,
  deleteSchema
};
