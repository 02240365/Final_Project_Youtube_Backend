/**
 * Subscription controller
 * Handles HTTP requests for subscription-related endpoints
 */
const subscriptionService = require('../services/subscriptionService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

/**
 * Create a new subscription
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createSubscription = async (req, res, next) => {
  try {
    const subscriptionData = req.body;
    const subscription = await subscriptionService.createSubscription(subscriptionData);
    
    return ApiResponse.success(
      res,
      201,
      'Subscription created successfully',
      subscription
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get subscriptions by user ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getSubscriptionsByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const subscriptions = await subscriptionService.getSubscriptionsByUserId(userId);
    
    return ApiResponse.success(
      res,
      200,
      'Subscriptions retrieved successfully',
      subscriptions
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get subscribers by channel ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getSubscribersByChannelId = async (req, res, next) => {
  try {
    const { channelId } = req.params;
    const subscribers = await subscriptionService.getSubscribersByChannelId(channelId);
    
    return ApiResponse.success(
      res,
      200,
      'Subscribers retrieved successfully',
      subscribers
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Check if user is subscribed to channel
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const checkSubscription = async (req, res, next) => {
  try {
    const { userId, channelId } = req.params;
    const isSubscribed = await subscriptionService.isUserSubscribed(userId, channelId);
    
    return ApiResponse.success(
      res,
      200,
      'Subscription status checked successfully',
      { isSubscribed }
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update subscription notification settings
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateSubscriptionNotification = async (req, res, next) => {
  try {
    const { userId, channelId } = req.params;
    const { notificationEnabled } = req.body;
    
    const subscription = await subscriptionService.updateSubscriptionNotification(
      userId,
      channelId,
      notificationEnabled
    );
    
    return ApiResponse.success(
      res,
      200,
      'Subscription notification settings updated successfully',
      subscription
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete subscription
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteSubscription = async (req, res, next) => {
  try {
    const { userId, channelId } = req.params;
    
    await subscriptionService.deleteSubscription(userId, channelId);
    
    return ApiResponse.success(
      res,
      200,
      'Subscription deleted successfully',
      null
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createSubscription,
  getSubscriptionsByUserId,
  getSubscribersByChannelId,
  checkSubscription,
  updateSubscriptionNotification,
  deleteSubscription,
};