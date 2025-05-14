/**
 * Channel routes
 * Defines API endpoints for channel-related operations
 */
const express = require('express');
const channelController = require('../controllers/channelController');
const validator = require('../middleware/validator');
const { channelSchema } = require('../models/channelModel');

const router = express.Router();

/**
 * @route   POST /api/v1/channels
 * @desc    Create a new channel
 * @access  Private (would require authentication in a real app)
 */
router.post(
  '/',
  validator(channelSchema, 'body'),
  channelController.createChannel
);

/**
 * @route   GET /api/v1/channels
 * @desc    Get all channels
 * @access  Public
 */
router.get(
  '/',
  channelController.getAllChannels
);

/**
 * @route   GET /api/v1/channels/:id
 * @desc    Get channel by ID
 * @access  Public
 */
router.get(
  '/:id',
  channelController.getChannelById
);

/**
 * @route   GET /api/v1/channels/user/:userId
 * @desc    Get channel by user ID
 * @access  Public
 */
router.get(
  '/user/:userId',
  channelController.getChannelByUserId
);

/**
 * @route   PUT /api/v1/channels/:id
 * @desc    Update channel
 * @access  Private (would require authentication in a real app)
 */
router.put(
  '/:id',
  channelController.updateChannel
);

/**
 * @route   DELETE /api/v1/channels/:id
 * @desc    Delete channel
 * @access  Private (would require authentication in a real app)
 */
router.delete(
  '/:id',
  channelController.deleteChannel
);

module.exports = router;