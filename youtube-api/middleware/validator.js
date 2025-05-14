/**
 * Request validation middleware using Joi
 * Validates request data against defined schemas
 * 
 * @param {Object} schema - Joi validation schema
 * @param {String} property - Request property to validate (body, params, query)
 * @returns {Function} Express middleware function
 */
const Joi = require('joi');

const validator = (schema, property) => {
  return (req, res, next) => {
    // Validate request data against schema
    const { error } = schema.validate(req[property], { abortEarly: false });
    
    // If validation passes, continue
    if (!error) {
      return next();
    }
    
    // Format validation errors
    const validationErrors = error.details.map((detail) => ({
      field: detail.path.join('.'),
      message: detail.message,
    }));
    
    // Send validation error response
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      details: validationErrors,
    });
  };
};

module.exports = validator;