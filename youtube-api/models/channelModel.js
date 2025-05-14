/**
 * Channel model
 * Defines the structure and validation for channel data
 */
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Channel schema for validation
const channelSchema = Joi.object({
  name: Joi.string().min(3).max(50).required()
    .messages({
      'string.base': 'Channel name must be a string',
      'string.min': 'Channel name must be at least 3 characters long',
      'string.max': 'Channel name cannot be longer than 50 characters',
      'any.required': 'Channel name is required',
    }),
  userId: Joi.string().required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required',
    }),
  description: Joi.string().max(5000)
    .messages({
      'string.base': 'Description must be a string',
      'string.max': 'Description cannot be longer than 5000 characters',
    }),
  avatar: Joi.string().uri(),
  banner: Joi.string().uri(),
  customUrl: Joi.string().alphanum().min(3).max(30)
    .messages({
      'string.base': 'Custom URL must be a string',
      'string.alphanum': 'Custom URL must only contain alphanumeric characters',
      'string.min': 'Custom URL must be at least 3 characters long',
      'string.max': 'Custom URL cannot be longer than 30 characters',
    }),
});

// Channel class
class Channel {
  /**
   * Create a new channel
   * 
   * @param {Object} channelData - Channel data
   */
  constructor(channelData) {
    this.id = uuidv4();
    this.name = channelData.name;
    this.userId = channelData.userId;
    this.description = channelData.description || '';
    this.avatar = channelData.avatar || '';
    this.banner = channelData.banner || '';
    this.customUrl = channelData.customUrl || '';
    this.subscribers = 0;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = {
  Channel,
  channelSchema,
};