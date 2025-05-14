/**
 * Video model
 * Defines the structure and validation for video data
 */
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Video schema for validation
const videoSchema = Joi.object({
  title: Joi.string().min(3).max(100).required()
    .messages({
      'string.base': 'Title must be a string',
      'string.min': 'Title must be at least 3 characters long',
      'string.max': 'Title cannot be longer than 100 characters',
      'any.required': 'Title is required',
    }),
  description: Joi.string().max(5000)
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot be longer than 5000 characters',
    }),
  channelId: Joi.string().required()
    .messages({
      'string.base': 'Channel ID must be a string',
      'any.required': 'Channel ID is required',
    }),
  thumbnail: Joi.string().uri(),
  videoUrl: Joi.string().uri().required()
    .messages({
      'string.base': 'Video URL must be a string',
      'string.uri': 'Video URL must be a valid URI',
      'any.required': 'Video URL is required',
    }),
  duration: Joi.number().integer().min(0)
    .messages({
      'number.base': 'Duration must be a number',
      'number.integer': 'Duration must be an integer',
      'number.min': 'Duration cannot be negative',
    }),
  visibility: Joi.string().valid('public', 'unlisted', 'private').default('public')
    .messages({
      'string.base': 'Visibility must be a string',
      'any.only': 'Visibility must be one of: public, unlisted, private',
    }),
  category: Joi.string()
    .messages({
      'string.base': 'Category must be a string',
    }),
  tags: Joi.array().items(Joi.string())
    .messages({
      'array.base': 'Tags must be an array',
    }),
});

// Video class
class Video {
  /**
   * Create a new video
   * 
   * @param {Object} videoData - Video data
   */
  constructor(videoData) {
    this.id = uuidv4();
    this.title = videoData.title;
    this.description = videoData.description || '';
    this.channelId = videoData.channelId;
    this.thumbnail = videoData.thumbnail || '';
    this.videoUrl = videoData.videoUrl;
    this.duration = videoData.duration || 0;
    this.visibility = videoData.visibility || 'public';
    this.category = videoData.category || '';
    this.tags = videoData.tags || [];
    this.views = 0;
    this.likes = 0;
    this.dislikes = 0;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = {
  Video,
  videoSchema,
};