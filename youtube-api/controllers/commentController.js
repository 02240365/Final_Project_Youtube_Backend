/**
 * Comment controller
 * Handles HTTP requests for comment-related endpoints
 */
const commentService = require('../services/commentService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

/**
 * Create a new comment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createComment = async (req, res, next) => {
  try {
    const commentData = req.body;
    const comment = await commentService.createComment(commentData);
    
    return ApiResponse.success(
      res,
      201,
      'Comment created successfully',
      comment
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get comments by video ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getCommentsByVideoId = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const comments = await commentService.getCommentsByVideoId(videoId);
    
    return ApiResponse.success(
      res,
      200,
      'Comments retrieved successfully',
      comments
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get comment by ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getCommentById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await commentService.getCommentById(id);
    
    return ApiResponse.success(
      res,
      200,
      'Comment retrieved successfully',
      comment
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update comment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // In a real app, this would come from auth middleware
    const { content } = req.body;
    
    const comment = await commentService.updateComment(id, userId, { content });
    
    return ApiResponse.success(
      res,
      200,
      'Comment updated successfully',
      comment
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete comment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // In a real app, this would come from auth middleware
    
    await commentService.deleteComment(id, userId);
    
    return ApiResponse.success(
      res,
      200,
      'Comment deleted successfully',
      null
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get replies to a comment
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getRepliesByCommentId = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const replies = await commentService.getRepliesByCommentId(commentId);
    
    return ApiResponse.success(
      res,
      200,
      'Replies retrieved successfully',
      replies
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComment,
  getCommentsByVideoId,
  getCommentById,
  updateComment,
  deleteComment,
  getRepliesByCommentId,
};