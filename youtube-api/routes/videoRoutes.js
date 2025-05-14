/**
 * Video routes
 * Defines API endpoints for video-related operations
 */
const express = require('express');
const videoController = require('../controllers/videoController');
const validator = require('../middleware/validator');
const { videoSchema } = require('../models/videoModel');

const router = express.Router();

/**
 * @route   POST /api/v1/videos
 * @desc    Create a new video
 * @access  Private (would require authentication in a real app)
 */
router.post(
  '/',
  validator(videoSchema, 'body'),
  videoController.createVideo
);

/**
 * @route   GET /api/v1/videos
 * @desc    Get all videos with optional filters
 * @access  Public
 */
router.get(
  '/',
  videoController.getAllVideos
);

/**
 * @route   GET /api/v1/videos/:id
 * @desc    Get video by ID
 * @access  Public
 */
router.get(
  '/:id',
  videoController.getVideoById
);

/**
 * @route   PUT /api/v1/videos/:id
 * @desc    Update video
 * @access  Private (would require authentication in a real app)
 */
router.put(
  '/:id',
  videoController.updateVideo
);

/**
 * @route   DELETE /api/v1/videos/:id
 * @desc    Delete video
 * @access  Private (would require authentication in a real app)
 */
router.delete(
  '/:id',
  videoController.deleteVideo
);

module.exports = router;