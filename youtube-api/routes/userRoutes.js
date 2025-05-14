/**
 * User routes
 * Defines API endpoints for user-related operations
 */
const express = require('express');
const userController = require('../controllers/userController');
const validator = require('../middleware/validator');
const { userSchema } = require('../models/userModel');

const router = express.Router();

/**
 * @route   POST /api/v1/users
 * @desc    Create a new user
 * @access  Public
 */
router.post(
  '/',
  validator(userSchema, 'body'),
  userController.createUser
);

/**
 * @route   GET /api/v1/users
 * @desc    Get all users
 * @access  Public (would be restricted in a real app)
 */
router.get(
  '/',
  userController.getAllUsers
);

/**
 * @route   GET /api/v1/users/:id
 * @desc    Get user by ID
 * @access  Public (would be restricted in a real app)
 */
router.get(
  '/:id',
  userController.getUserById
);

/**
 * @route   PUT /api/v1/users/:id
 * @desc    Update user
 * @access  Private (would require authentication in a real app)
 */
router.put(
  '/:id',
  userController.updateUser
);

/**
 * @route   DELETE /api/v1/users/:id
 * @desc    Delete user
 * @access  Private (would require authentication in a real app)
 */
router.delete(
  '/:id',
  userController.deleteUser
);

module.exports = router;