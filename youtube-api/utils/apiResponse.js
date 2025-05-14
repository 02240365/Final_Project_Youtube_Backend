/**
 * API Response utility
 * Provides standardized response formats
 */
class ApiResponse {
    /**
     * Create a success response
     * 
     * @param {Object} res - Express response object
     * @param {Number} statusCode - HTTP status code
     * @param {String} message - Success message
     * @param {Object|Array} data - Response data
     * @param {Object} meta - Optional metadata (pagination, etc.)
     */
    static success(res, statusCode, message, data, meta = null) {
      const response = {
        status: 'success',
        message,
        data,
      };
      
      if (meta) {
        response.meta = meta;
      }
      
      return res.status(statusCode).json(response);
    }
    
    /**
     * Create an error response
     * 
     * @param {Object} res - Express response object
     * @param {Number} statusCode - HTTP status code
     * @param {String} message - Error message
     * @param {Array} details - Optional validation details
     */
    static error(res, statusCode, message, details = null) {
      const response = {
        status: 'error',
        message,
      };
      
      if (details) {
        response.details = details;
      }
      
      return res.status(statusCode).json(response);
    }
  }
  
  module.exports = ApiResponse;