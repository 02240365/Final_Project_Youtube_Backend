/**
 * Comment service
 * Contains business logic for comment-related operations
 */
const { Comment } = require('../models/commentModel');
const ApiError = require('../utils/apiError');

// In-memory storage for comments (will be replaced with database in Assignment 2)
const comments = [];

/**
 * Create a new comment
 * 
 * @param {Object} commentData - Comment data
 * @returns {Object} Created comment
 */
const createComment = async (commentData) => {
  // Create new comment
  const newComment = new Comment(commentData);
  
  // Save comment to storage
  comments.push(newComment);
  
  return newComment;
};

/**
 * Get comments by video ID
 * 
 * @param {String} videoId - Video ID
 * @returns {Array} List of comments
 */
const getCommentsByVideoId = async (videoId) => {
  // Filter comments by video ID
  return comments.filter(comment => comment.videoId === videoId);
};

/**
 * Get comment by ID
 * 
 * @param {String} commentId - Comment ID
 * @returns {Object} Comment
 */
const getCommentById = async (commentId) => {
  // Find comment by ID
  const comment = comments.find(comment => comment.id === commentId);
  
  // If comment not found, throw error
  if (!comment) {
    throw new ApiError('Comment not found', 404);
  }
  
  return comment;
};

/**
 * Update comment
 * 
 * @param {String} commentId - Comment ID
 * @param {String} userId - User ID (for authorization)
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated comment
 */
const updateComment = async (commentId, userId, updateData) => {
  // Find comment index
  const commentIndex = comments.findIndex(comment => comment.id === commentId);
  
  // If comment not found, throw error
  if (commentIndex === -1) {
    throw new ApiError('Comment not found', 404);
  }
  
  // Check if user is the comment author
  if (comments[commentIndex].userId !== userId) {
    throw new ApiError('You are not authorized to update this comment', 403);
  }
  
  // Update comment
  const updatedComment = {
    ...comments[commentIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  // Save updated comment
  comments[commentIndex] = updatedComment;
  
  return updatedComment;
};

/**
 * Delete comment
 * 
 * @param {String} commentId - Comment ID
 * @param {String} userId - User ID (for authorization)
 * @returns {Boolean} Deletion success
 */
const deleteComment = async (commentId, userId) => {
  // Find comment index
  const commentIndex = comments.findIndex(comment => comment.id === commentId);
  
  // If comment not found, throw error
  if (commentIndex === -1) {
    throw new ApiError('Comment not found', 404);
  }
  
  // Check if user is the comment author
  if (comments[commentIndex].userId !== userId) {
    throw new ApiError('You are not authorized to delete this comment', 403);
  }
  
  // Remove comment
  comments.splice(commentIndex, 1);
  
  return true;
};

/**
 * Get replies to a comment
 * 
 * @param {String} commentId - Parent comment ID
 * @returns {Array} List of replies
 */
const getRepliesByCommentId = async (commentId) => {
  // Filter comments by parent ID
  return comments.filter(comment => comment.parentId === commentId);
};

module.exports = {
  createComment,
  getCommentsByVideoId,
  getCommentById,
  updateComment,
  deleteComment,
  getRepliesByCommentId,
};