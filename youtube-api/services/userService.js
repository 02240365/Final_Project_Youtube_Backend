/**
 * User service
 * Contains business logic for user-related operations
 */
const { User } = require('../models/userModel');
const ApiError = require('../utils/apiError');

// In-memory storage for users (will be replaced with database in Assignment 2)
const users = [];

/**
 * Create a new user
 * 
 * @param {Object} userData - User data
 * @returns {Object} Created user
 */
const createUser = async (userData) => {
  // Check if user with email already exists
  const existingUserByEmail = users.find(user => user.email === userData.email);
  if (existingUserByEmail) {
    throw new ApiError('Email already in use', 400);
  }
  
  // Check if user with username already exists
  const existingUserByUsername = users.find(user => user.username === userData.username);
  if (existingUserByUsername) {
    throw new ApiError('Username already taken', 400);
  }
  
  // Create new user
  const newUser = new User(userData);
  
  // In a real app, we would hash the password here
  
  // Save user to storage
  users.push(newUser);
  
  // Return user without password
  const { password, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

/**
 * Get all users
 * 
 * @returns {Array} List of users
 */
const getAllUsers = async () => {
  // Return users without passwords
  return users.map(user => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

/**
 * Get user by ID
 * 
 * @param {String} userId - User ID
 * @returns {Object} User
 */
const getUserById = async (userId) => {
  // Find user by ID
  const user = users.find(user => user.id === userId);
  
  // If user not found, throw error
  if (!user) {
    throw new ApiError('User not found', 404);
  }
  
  // Return user without password
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

/**
 * Update user
 * 
 * @param {String} userId - User ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated user
 */
const updateUser = async (userId, updateData) => {
  // Find user index
  const userIndex = users.findIndex(user => user.id === userId);
  
  // If user not found, throw error
  if (userIndex === -1) {
    throw new ApiError('User not found', 404);
  }
  
  // Update user
  const updatedUser = {
    ...users[userIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  // Save updated user
  users[userIndex] = updatedUser;
  
  // Return user without password
  const { password, ...userWithoutPassword } = updatedUser;
  return userWithoutPassword;
};

/**
 * Delete user
 * 
 * @param {String} userId - User ID
 * @returns {Boolean} Deletion success
 */
const deleteUser = async (userId) => {
  // Find user index
  const userIndex = users.findIndex(user => user.id === userId);
  
  // If user not found, throw error
  if (userIndex === -1) {
    throw new ApiError('User not found', 404);
  }
  
  // Remove user
  users.splice(userIndex, 1);
  
  return true;
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};