/**
 * Request logging middleware
 * Logs information about incoming requests
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const logger = (req, res, next) => {
    // Get current timestamp
    const timestamp = new Date().toISOString();
    
    // Log request details
    console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
    
    // Calculate request processing time
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      console.log(`[${timestamp}] ${req.method} ${req.originalUrl} ${res.statusCode} - ${duration}ms`);
    });
    
    next();
  };
  
  module.exports = logger;