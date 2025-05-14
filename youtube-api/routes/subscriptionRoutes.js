/**
 * Subscription routes
 * Defines API endpoints for subscription-related operations
 */
const express = require('express');
const subscriptionController = require('../controllers/subscriptionController');
const validator = require('../middleware/validator');
const { subscriptionSchema } = require('../models/subscriptionModel');

const router = express.Router();

/**
 * @route   POST /api/v1/subscriptions
 * @desc    Create a new subscription
 * @access  Private (would require authentication in a real app)
 */
router.post(
  '/',
  validator(subscriptionSchema, 'body'),
  subscriptionController.createSubscription
);

/**
 * @route   GET /api/v1/subscriptions/user/:userId
 * @desc    Get subscriptions by user ID
 * @access  Public
 */
router.get(
  '/user/:userId',
  subscriptionController.getSubscriptionsByUserId
);

/**
 * @route   GET /api/v1/subscriptions/channel/:channelId
 * @desc    Get subscribers by channel ID
 * @access  Public
 */
router.get(
  '/channel/:channelId',
  subscriptionController.getSubscribersByChannelId
);

/**
 * @route   GET /api/v1/subscriptions/check/:userId/:channelId
 * @desc    Check if user is subscribed to channel
 * @access  Public
 */
router.get(
  '/check/:userId/:channelId',
  subscriptionController.checkSubscription
);

/**
 * @route   PATCH /api/v1/subscriptions/:userId/:channelId
 * @desc    Update subscription notification settings
 * @access  Private (would require authentication in a real app)
 */
router.patch(
  '/:userId/:channelId',
  subscriptionController.updateSubscriptionNotification
);

/**
 * @route   DELETE /api/v1/subscriptions/:userId/:channelId
 * @desc    Delete subscription
 * @access  Private (would require authentication in a real app)
 */
router.delete(
  '/:userId/:channelId',
  subscriptionController.deleteSubscription
);

module.exports = router;