/**
 * Comment model
 * Defines the structure and validation for comment data
 */
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Comment schema for validation
const commentSchema = Joi.object({
  videoId: Joi.string().required()
    .messages({
      'string.base': 'Video ID must be a string',
      'any.required': 'Video ID is required',
    }),
  userId: Joi.string().required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required',
    }),
  content: Joi.string().min(1).max(1000).required()
    .messages({
      'string.base': 'Comment content must be a string',
      'string.min': 'Comment content cannot be empty',
      'string.max': 'Comment content cannot be longer than 1000 characters',
      'any.required': 'Comment content is required',
    }),
  parentId: Joi.string().allow(null)
    .messages({
      'string.base': 'Parent comment ID must be a string',
    }),
});

// Comment class
class Comment {
  /**
   * Create a new comment
   * 
   * @param {Object} commentData - Comment data
   */
  constructor(commentData) {
    this.id = uuidv4();
    this.videoId = commentData.videoId;
    this.userId = commentData.userId;
    this.content = commentData.content;
    this.parentId = commentData.parentId || null; // For replies to comments
    this.likes = 0;
    this.dislikes = 0;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = {
  Comment,
  commentSchema,
};