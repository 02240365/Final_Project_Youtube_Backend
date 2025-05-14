/**
 * Subscription service
 * Contains business logic for subscription-related operations
 */
const { Subscription } = require('../models/subscriptionModel');
const ApiError = require('../utils/apiError');

// In-memory storage for subscriptions (will be replaced with database in Assignment 2)
const subscriptions = [];

/**
 * Create a new subscription
 * 
 * @param {Object} subscriptionData - Subscription data
 * @returns {Object} Created subscription
 */
const createSubscription = async (subscriptionData) => {
  // Check if subscription already exists
  const existingSubscription = subscriptions.find(
    sub => sub.userId === subscriptionData.userId && sub.channelId === subscriptionData.channelId
  );
  
  if (existingSubscription) {
    throw new ApiError('User is already subscribed to this channel', 400);
  }
  
  // Create new subscription
  const newSubscription = new Subscription(subscriptionData);
  
  // Save subscription to storage
  subscriptions.push(newSubscription);
  
  return newSubscription;
};

/**
 * Get subscriptions by user ID
 * 
 * @param {String} userId - User ID
 * @returns {Array} List of subscriptions
 */
const getSubscriptionsByUserId = async (userId) => {
  // Filter subscriptions by user ID
  return subscriptions.filter(subscription => subscription.userId === userId);
};

/**
 * Get subscribers by channel ID
 * 
 * @param {String} channelId - Channel ID
 * @returns {Array} List of subscriptions
 */
const getSubscribersByChannelId = async (channelId) => {
  // Filter subscriptions by channel ID
  return subscriptions.filter(subscription => subscription.channelId === channelId);
};

/**
 * Check if user is subscribed to channel
 * 
 * @param {String} userId - User ID
 * @param {String} channelId - Channel ID
 * @returns {Boolean} Is subscribed
 */
const isUserSubscribed = async (userId, channelId) => {
  // Find subscription
  const subscription = subscriptions.find(
    sub => sub.userId === userId && sub.channelId === channelId
  );
  
  return !!subscription;
};

/**
 * Update subscription notification settings
 * 
 * @param {String} userId - User ID
 * @param {String} channelId - Channel ID
 * @param {Boolean} notificationEnabled - Notification setting
 * @returns {Object} Updated subscription
 */
const updateSubscriptionNotification = async (userId, channelId, notificationEnabled) => {
  // Find subscription index
  const subscriptionIndex = subscriptions.findIndex(
    sub => sub.userId === userId && sub.channelId === channelId
  );
  
  // If subscription not found, throw error
  if (subscriptionIndex === -1) {
    throw new ApiError('Subscription not found', 404);
  }
  
  // Update subscription
  subscriptions[subscriptionIndex].notificationEnabled = notificationEnabled;
  subscriptions[subscriptionIndex].updatedAt = new Date().toISOString();
  
  return subscriptions[subscriptionIndex];
};

/**
 * Delete subscription
 * 
 * @param {String} userId - User ID
 * @param {String} channelId - Channel ID
 * @returns {Boolean} Deletion success
 */
const deleteSubscription = async (userId, channelId) => {
  // Find subscription index
  const subscriptionIndex = subscriptions.findIndex(
    sub => sub.userId === userId && sub.channelId === channelId
  );
  
  // If subscription not found, throw error
  if (subscriptionIndex === -1) {
    throw new ApiError('Subscription not found', 404);
  }
  
  // Remove subscription
  subscriptions.splice(subscriptionIndex, 1);
  
  return true;
};

module.exports = {
  createSubscription,
  getSubscriptionsByUserId,
  getSubscribersByChannelId,
  isUserSubscribed,
  updateSubscriptionNotification,
  deleteSubscription,
};