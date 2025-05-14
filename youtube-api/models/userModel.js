/**
 * User model
 * Defines the structure and validation for user data
 */
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// User schema for validation
const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required()
    .messages({
      'string.base': 'Username must be a string',
      'string.alphanum': 'Username must only contain alphanumeric characters',
      'string.min': 'Username must be at least 3 characters long',
      'string.max': 'Username cannot be longer than 30 characters',
      'any.required': 'Username is required',
    }),
  email: Joi.string().email().required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(8).required()
    .messages({
      'string.base': 'Password must be a string',
      'string.min': 'Password must be at least 8 characters long',
      'any.required': 'Password is required',
    }),
  firstName: Joi.string().max(50),
  lastName: Joi.string().max(50),
  avatar: Joi.string().uri(),
  bio: Joi.string().max(1000),
  country: Joi.string().max(50),
});

// User class
class User {
  /**
   * Create a new user
   * 
   * @param {Object} userData - User data
   */
  constructor(userData) {
    this.id = uuidv4();
    this.username = userData.username;
    this.email = userData.email;
    this.password = userData.password; // In a real app, this would be hashed
    this.firstName = userData.firstName || '';
    this.lastName = userData.lastName || '';
    this.avatar = userData.avatar || '';
    this.bio = userData.bio || '';
    this.country = userData.country || '';
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = {
  User,
  userSchema,
};