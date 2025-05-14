/**
 * Configuration settings for the YouTube Clone API
 * Loads environment variables and provides configuration values
 */

// Load environment variables
require('dotenv').config();

// Export configuration object
module.exports = {
  // Server configuration
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // CORS configuration
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  
  // API configuration
  apiVersion: process.env.API_VERSION || 'v1',
};