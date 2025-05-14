/**
 * User controller
 * Handles HTTP requests for user-related endpoints
 */
const userService = require('../services/userService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

/**
 * Create a new user
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createUser = async (req, res, next) => {
  try {
    const userData = req.body;
    const user = await userService.createUser(userData);
    
    return ApiResponse.success(
      res,
      201,
      'User created successfully',
      user
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get all users
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    
    return ApiResponse.success(
      res,
      200,
      'Users retrieved successfully',
      users
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get user by ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    
    return ApiResponse.success(
      res,
      200,
      'User retrieved successfully',
      user
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update user
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Prevent updating sensitive fields
    delete updateData.password;
    
    const user = await userService.updateUser(id, updateData);
    
    return ApiResponse.success(
      res,
      200,
      'User updated successfully',
      user
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    await userService.deleteUser(id);
    
    return ApiResponse.success(
      res,
      200,
      'User deleted successfully',
      null
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};