/**
 * Video controller
 * Handles HTTP requests for video-related endpoints
 */
const videoService = require('../services/videoService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

/**
 * Create a new video
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createVideo = async (req, res, next) => {
  try {
    const videoData = req.body;
    const video = await videoService.createVideo(videoData);
    
    return ApiResponse.success(
      res,
      201,
      'Video created successfully',
      video
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get all videos
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getAllVideos = async (req, res, next) => {
  try {
    // Extract query parameters for filtering
    const { channelId, category, visibility } = req.query;
    const filters = { channelId, category, visibility };
    
    const videos = await videoService.getAllVideos(filters);
    
    return ApiResponse.success(
      res,
      200,
      'Videos retrieved successfully',
      videos
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get video by ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getVideoById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const video = await videoService.getVideoById(id);
    
    // Increment view count
    await videoService.incrementViewCount(id);
    
    return ApiResponse.success(
      res,
      200,
      'Video retrieved successfully',
      video
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update video
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Prevent updating certain fields
    delete updateData.views;
    delete updateData.likes;
    delete updateData.dislikes;
    
    const video = await videoService.updateVideo(id, updateData);
    
    return ApiResponse.success(
      res,
      200,
      'Video updated successfully',
      video
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete video
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteVideo = async (req, res, next) => {
  try {
    const { id } = req.params;
    await videoService.deleteVideo(id);
    
    return ApiResponse.success(
      res,
      200,
      'Video deleted successfully',
      null
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
};