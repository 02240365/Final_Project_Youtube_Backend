/**
 * Custom API Error class
 * Extends Error to include status code and operational status
 */
class ApiError extends Error {
    /**
     * Create a new API error
     * 
     * @param {String} message - Error message
     * @param {Number} statusCode - HTTP status code
     * @param {Array} details - Optional validation details
     */
    constructor(message, statusCode, details = null) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
      this.details = details;
      
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = ApiError;