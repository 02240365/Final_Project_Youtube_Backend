/**
 * Global error handling middleware
 * Provides consistent error responses across the API
 * 
 * @param {Object} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const errorHandler = (err, req, res, next) => {
    // Default error status and message
    const statusCode = err.statusCode || 500;
    const status = err.status || 'error';
    
    // Prepare error response
    const errorResponse = {
      status,
      message: err.message || 'Something went wrong',
    };
    
    // Add error details in development mode
    if (process.env.NODE_ENV === 'development') {
      errorResponse.error = err;
      errorResponse.stack = err.stack;
    }
    
    // Add validation errors if available
    if (err.details) {
      errorResponse.details = err.details;
    }
    
    // Send error response
    res.status(statusCode).json(errorResponse);
  };
  
  module.exports = errorHandler;