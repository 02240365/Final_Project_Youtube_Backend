/**
 * Subscription model
 * Defines the structure and validation for subscription data
 */
const Joi = require('joi');
const { v4: uuidv4 } = require('uuid');

// Subscription schema for validation
const subscriptionSchema = Joi.object({
  userId: Joi.string().required()
    .messages({
      'string.base': 'User ID must be a string',
      'any.required': 'User ID is required',
    }),
  channelId: Joi.string().required()
    .messages({
      'string.base': 'Channel ID must be a string',
      'any.required': 'Channel ID is required',
    }),
  notificationEnabled: Joi.boolean().default(false)
    .messages({
      'boolean.base': 'Notification enabled must be a boolean',
    }),
});

// Subscription class
class Subscription {
  /**
   * Create a new subscription
   * 
   * @param {Object} subscriptionData - Subscription data
   */
  constructor(subscriptionData) {
    this.id = uuidv4();
    this.userId = subscriptionData.userId;
    this.channelId = subscriptionData.channelId;
    this.notificationEnabled = subscriptionData.notificationEnabled || false;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = {
  Subscription,
  subscriptionSchema,
};