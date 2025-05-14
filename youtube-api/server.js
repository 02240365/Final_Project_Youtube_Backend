/**
 * Server entry point for YouTube Clone API
 * This file initializes the Express server and handles uncaught exceptions
 */

// Import required modules
const http = require('http');
const app = require('./app');
const config = require('./config/config');

// Create HTTP server
const server = http.createServer(app);

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

// Start the server
server.listen(config.port, '0.0.0.0', () => {
    console.log(`Server running in ${config.nodeEnv} mode on port ${config.port}`);
  });