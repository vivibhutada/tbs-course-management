const Joi = require('joi');

// Delete schema for validation
const permission = Joi.object({
  roleid: Joi.string()
    .required()
    .messages({
      'any.required': 'roleId is required.',
      'string.base': 'roleId must be a string.',
      'string.empty': 'roleId cannot be empty.',
    }),
    permission: Joi.array()
    .items(
      Joi.object({
        menuId: Joi.array()
          .items(Joi.number().integer().required())
          .min(1)
          .required()
          .messages({
            'array.base': '"menuId" must be an array',
            'array.min': '"menuId" must contain at least one ID',
            'any.required': '"menuId" is required',
            'number.base': '"menuId" items must be numbers',
            'number.integer': '"menuId" items must be integers',
          }),
        action: Joi.string()
          .pattern(/^[a-z|]+$/)
          .required()
          .messages({
            'any.required': 'action is required',
            'string.base': 'action must be a string',
            'string.pattern.base': 'action must be a pipe-separated string of lowercase letters',
          }),
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': '"permission" must be an array',
      'array.min': '"permission" must contain at least one item',
      'any.required': '"permission" is required',
    }),
}).options({
  allowUnknown: true,
  abortEarly: false, // Ensures all errors are returned
});

const permissionList = Joi.object({
  roleid: Joi.string()
    .required()
    .messages({
      'any.required': 'roleId is required.',
      'string.base': 'roleId must be a string.',
      'string.empty': 'roleId cannot be empty.',
    }),

}).options({
  allowUnknown: true,
  abortEarly: false, // Ensures all errors are returned
});

// Messages object
const messages = {
  no_data: "No Data Found.",
  permission_saved: "Permission Saved Successfully",
};

// Columns to encrypt
const encryptedColumns = [];

// Export module
module.exports = {
  permission,
  permissionList,
  messages,
  encryptedColumns,
};
