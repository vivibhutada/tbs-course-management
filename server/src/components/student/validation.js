const joi = require('joi');
const {InputDateFormat} = require('../../config/constant');
const moment = require('moment');

const schema = joi.object({
  id: joi.string()
    .when('$isUpdate', {
      is: true, // Check if it's an update
      then: joi.required().messages({
        'any.required': 'Id is required.',
        'string.base': 'Id must be a string.',
        'string.empty': 'Id cannot be empty.',
      }),
      otherwise: joi.forbidden(), // Disallow the `id` field during creation
  }),
  roll_no: joi.number()
    .required()
    .messages({
      'any.required': 'Roll number is required.',
      'number.base': 'Roll number must be a number.',
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
  middlename: joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/)
    .optional()
    .allow('')
    .messages({
      'string.base': 'Middle name must be a string.',
      'string.pattern.base': 'Middle name must contain only alphabetic characters and single spaces between words.',
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
  dob: joi.string()
    .required()
    .custom((value, helpers) => {
      // Validate format using the constant
      if (!moment(value, InputDateFormat, true).isValid()) {
        return helpers.message(`Date of birth must be in ${InputDateFormat} format.`);
      }
      // Validate not greater than today
      if (moment(value, InputDateFormat).isAfter(moment())) {
        return helpers.message('Date of birth cannot be greater than today.');
      }
      return value;
    })
    .messages({
      'any.required': 'Date of birth is required.',
      'string.empty': 'Date of birth cannot be empty.',
    }),  
  gender: joi.string()
    .valid('Male', 'Female', 'Other')
    .required()
    .messages({
      'any.required': 'Gender is required.',
      'string.base': 'Gender must be a string.',
      'any.only': 'Gender must be one of Male, Female, or Other.',
    }),  
  mobile_no: joi.string()
    .pattern(/^[6-9][0-9]{9}$/)
    .required()
    .messages({
      'any.required': 'Mobile number is required.',
      'string.empty': 'Mobile number cannot be empty.',
      'string.pattern.base': 'Mobile number must start with 6 to 9 and be a 10-digit number.',
    }),
  adhar_no: joi.string()
    .pattern(/^[0-9]{12}$/)
    .required()
    .messages({
      'any.required': 'Aadhar number is required.',
      'string.empty': 'Aadhar number cannot be empty.',
      'string.pattern.base': 'Aadhar number must be a 12-digit number without spaces or special characters.',
    }),
  pan_no: joi.string()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/)
    .required()
    .messages({
      'any.required': 'PAN card number is required.',
      'string.empty': 'PAN card number cannot be empty.',
      'string.pattern.base': 'PAN card number must be in the format of 5 uppercase letters, 4 digits, and 1 uppercase letter (e.g., ABCDE1234F).',
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

const updateStatus = joi.object({
  status: joi.string()
  .valid('Active', 'Inactive')
  .required()
  .messages({
    'any.required': 'Status is required.',
    'string.base': 'Status must be a string.',
    'string.empty': 'Status can not be empty.',
    'any.only': 'Status must be one of Active, Inactive.',
  }),
}).options({
  allowUnknown: true,
  abortEarly: false // Ensures all errors are returned
});


const messages = {
  "dp_pan":"Pan number already exists. ",
  "dp_adhar":"Adhar number already exists. ",
  "dp_mob":"Mobile number already exists. ",
  "dp_rollno":"Roll number already exists. ",
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
  "statusupdate":"Status updated successfully",
};

const filter_schema = joi.object({
  roll_no: joi.number().optional().allow('')    
    .messages({
      'number.base': 'Roll number must be a number.',
    }),
  firstname: joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).optional().allow('')
    .messages({
      'string.base': 'First name must be a string.',
      'string.pattern.base': 'Invalid First name must contain only alphabetic characters',
    }),
  middlename: joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).optional().allow('')
    .messages({
      'string.base': 'Middle name must be a string.',
      'string.pattern.base': 'Middle name must contain only alphabetic characters and single spaces between words.',
    }),
  lastname: joi.string()
    .pattern(/^[a-zA-Z]+( [a-zA-Z]+)*$/).optional().allow('')
    .messages({
      'string.base': 'Last name must be a string.',
      'string.pattern.base': 'Invalid Last name must contain only alphabetic characters',
    }),  
  dob: joi.string().optional().allow('')
    .custom((value, helpers) => {
      // Validate format using the constant
      if (!moment(value, InputDateFormat, true).isValid()) {
        return helpers.message(`Date of birth must be in ${InputDateFormat} format.`);
      }
      // Validate not greater than today
      if (moment(value, InputDateFormat).isAfter(moment())) {
        return helpers.message('Date of birth cannot be greater than today.');
      }
      return value;
    })
    .messages({
    }),  
  gender: joi.string()
    .valid('Male', 'Female', 'Other').optional().allow('')
    .messages({
      'string.base': 'Gender must be a string.',
      'any.only': 'Gender must be one of Male, Female, or Other.',
    }),  
  mobile_no: joi.string()
    .pattern(/^[6-9][0-9]{9}$/).optional().allow('')
    .messages({
      'string.pattern.base': 'Mobile number must start with 6 to 9 and be a 10-digit number.',
    }),
  adhar_no: joi.string()
    .pattern(/^[0-9]{12}$/).optional().allow('')
    .messages({
      'string.pattern.base': 'Aadhar number must be a 12-digit number without spaces or special characters.',
    }),
  pan_no: joi.string()
    .pattern(/^[A-Z]{5}[0-9]{4}[A-Z]$/).optional().allow('')
    .messages({
      'string.pattern.base': 'PAN card number must be in the format of 5 uppercase letters, 4 digits, and 1 uppercase letter (e.g., ABCDE1234F).',
    }),       
    
}).options({ 
  allowUnknown: true,
  abortEarly: false // Ensures all errors are returned
});

const encryptedColumns = ["adhar_no","pan_no"];

module.exports = {
  schema,
  messages,
  encryptedColumns,
  deleteSchema,
  updateStatus,
  filter_schema
};

/* 
 If any column neeed to encrypted post data insertion then first take the backup of table then we need to update the column data type
 to varchar

 need to call api {baseurl}/api/column-security
 body in jsone 
 {
    "table_name":"table_name",
    "columns":["columnname"], // it must be in array we can decrypt/encrypt more than one column 
    "pk":"primery_key",
    "flag":"encrypt"  it will be decrypt/encrypt based on requirement
 }
 
 Also add the column name in encryptedColumns array under validation file
*/