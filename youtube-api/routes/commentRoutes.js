/**
 * Comment routes
 * Defines API endpoints for comment-related operations
 */
const express = require('express');
const commentController = require('../controllers/commentController');
const validator = require('../middleware/validator');
const { commentSchema } = require('../models/commentModel');

const router = express.Router();

/**
 * @route   POST /api/v1/comments
 * @desc    Create a new comment
 * @access  Private (would require authentication in a real app)
 */
router.post(
  '/',
  validator(commentSchema, 'body'),
  commentController.createComment
);

/**
 * @route   GET /api/v1/comments/video/:videoId
 * @desc    Get comments by video ID
 * @access  Public
 */
router.get(
  '/video/:videoId',
  commentController.getCommentsByVideoId
);

/**
 * @route   GET /api/v1/comments/:id
 * @desc    Get comment by ID
 * @access  Public
 */
router.get(
  '/:id',
  commentController.getCommentById
);

/**
 * @route   GET /api/v1/comments/:commentId/replies
 * @desc    Get replies to a comment
 * @access  Public
 */
router.get(
  '/:commentId/replies',
  commentController.getRepliesByCommentId
);

/**
 * @route   PUT /api/v1/comments/:id
 * @desc    Update comment
 * @access  Private (would require authentication in a real app)
 */
router.put(
  '/:id',
  commentController.updateComment
);

/**
 * @route   DELETE /api/v1/comments/:id
 * @desc    Delete comment
 * @access  Private (would require authentication in a real app)
 */
router.delete(
  '/:id',
  commentController.deleteComment
);

module.exports = router;