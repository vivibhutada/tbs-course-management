// faqs/validation.js
const joi = require('joi');

const schema = joi.object({
      // type: joi.required().messages({
      //   "any.required": `type is a required.`,
      // }), 
      question: joi.required().messages({
        "any.required": `Question is a required.`,
      }), 
      answer: joi.required().messages({
        "any.required": `Answer is a required.`,
      }),   
      order_by: joi.required().messages({
        "any.required": `Order by is required.`,
      }), 
      status: joi.required().messages({
        "any.required": `Status is Required`,
      }),
});

const messages = {
  'add_success':  `FAQs created successfully`,
  'update_success':  `FAQs updated successfully`,
  'something_wrong_try_later':  `Something went wrong. Please try again later`,
  'faqname_duplicate':  `FAQs name already exists`,
  'not_updated':  `FAQs not found or not updated`,
  'status_change' : "Status changed successfully",
  'record_delete' : "Record Delete successfully"
};

module.exports = {
    schema,
    messages
}