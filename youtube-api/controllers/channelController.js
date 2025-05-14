/**
 * Channel controller
 * Handles HTTP requests for channel-related endpoints
 */
const channelService = require('../services/channelService');
const ApiResponse = require('../utils/apiResponse');
const ApiError = require('../utils/apiError');

/**
 * Create a new channel
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const createChannel = async (req, res, next) => {
  try {
    const channelData = req.body;
    const channel = await channelService.createChannel(channelData);
    
    return ApiResponse.success(
      res,
      201,
      'Channel created successfully',
      channel
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get all channels
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getAllChannels = async (req, res, next) => {
  try {
    const channels = await channelService.getAllChannels();
    
    return ApiResponse.success(
      res,
      200,
      'Channels retrieved successfully',
      channels
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get channel by ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getChannelById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const channel = await channelService.getChannelById(id);
    
    return ApiResponse.success(
      res,
      200,
      'Channel retrieved successfully',
      channel
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get channel by user ID
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const getChannelByUserId = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const channel = await channelService.getChannelByUserId(userId);
    
    return ApiResponse.success(
      res,
      200,
      'Channel retrieved successfully',
      channel
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update channel
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const updateChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // In a real app, this would come from auth middleware
    const updateData = req.body;
    
    // Prevent updating certain fields
    delete updateData.userId;
    delete updateData.subscribers;
    
    const channel = await channelService.updateChannel(id, userId, updateData);
    
    return ApiResponse.success(
      res,
      200,
      'Channel updated successfully',
      channel
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete channel
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const deleteChannel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // In a real app, this would come from auth middleware
    
    await channelService.deleteChannel(id, userId);
    
    return ApiResponse.success(
      res,
      200,
      'Channel deleted successfully',
      null
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createChannel,
  getAllChannels,
  getChannelById,
  getChannelByUserId,
  updateChannel,
  deleteChannel,
};