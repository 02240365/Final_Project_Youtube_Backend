/**
 * Channel service
 * Contains business logic for channel-related operations
 */
const { Channel } = require('../models/channelModel');
const ApiError = require('../utils/apiError');

// In-memory storage for channels (will be replaced with database in Assignment 2)
const channels = [];

/**
 * Create a new channel
 * 
 * @param {Object} channelData - Channel data
 * @returns {Object} Created channel
 */
const createChannel = async (channelData) => {
  // Check if user already has a channel
  const existingChannel = channels.find(channel => channel.userId === channelData.userId);
  if (existingChannel) {
    throw new ApiError('User already has a channel', 400);
  }
  
  // Check if channel name is already taken
  const existingChannelByName = channels.find(channel => channel.name === channelData.name);
  if (existingChannelByName) {
    throw new ApiError('Channel name already taken', 400);
  }
  
  // Check if custom URL is already taken
  if (channelData.customUrl) {
    const existingChannelByUrl = channels.find(channel => channel.customUrl === channelData.customUrl);
    if (existingChannelByUrl) {
      throw new ApiError('Custom URL already taken', 400);
    }
  }
  
  // Create new channel
  const newChannel = new Channel(channelData);
  
  // Save channel to storage
  channels.push(newChannel);
  
  return newChannel;
};

/**
 * Get all channels
 * 
 * @returns {Array} List of channels
 */
const getAllChannels = async () => {
  return channels;
};

/**
 * Get channel by ID
 * 
 * @param {String} channelId - Channel ID
 * @returns {Object} Channel
 */
const getChannelById = async (channelId) => {
  // Find channel by ID
  const channel = channels.find(channel => channel.id === channelId);
  
  // If channel not found, throw error
  if (!channel) {
    throw new ApiError('Channel not found', 404);
  }
  
  return channel;
};

/**
 * Get channel by user ID
 * 
 * @param {String} userId - User ID
 * @returns {Object} Channel
 */
const getChannelByUserId = async (userId) => {
  // Find channel by user ID
  const channel = channels.find(channel => channel.userId === userId);
  
  // If channel not found, throw error
  if (!channel) {
    throw new ApiError('Channel not found for this user', 404);
  }
  
  return channel;
};

/**
 * Update channel
 * 
 * @param {String} channelId - Channel ID
 * @param {String} userId - User ID (for authorization)
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated channel
 */
const updateChannel = async (channelId, userId, updateData) => {
  // Find channel index
  const channelIndex = channels.findIndex(channel => channel.id === channelId);
  
  // If channel not found, throw error
  if (channelIndex === -1) {
    throw new ApiError('Channel not found', 404);
  }
  
  // Check if user is the channel owner
  if (channels[channelIndex].userId !== userId) {
    throw new ApiError('You are not authorized to update this channel', 403);
  }
  
  // Check if custom URL is already taken
  if (updateData.customUrl && updateData.customUrl !== channels[channelIndex].customUrl) {
    const existingChannelByUrl = channels.find(channel => channel.customUrl === updateData.customUrl);
    if (existingChannelByUrl) {
      throw new ApiError('Custom URL already taken', 400);
    }
  }
  
  // Update channel
  const updatedChannel = {
    ...channels[channelIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  // Save updated channel
  channels[channelIndex] = updatedChannel;
  
  return updatedChannel;
};

/**
 * Delete channel
 * 
 * @param {String} channelId - Channel ID
 * @param {String} userId - User ID (for authorization)
 * @returns {Boolean} Deletion success
 */
const deleteChannel = async (channelId, userId) => {
  // Find channel index
  const channelIndex = channels.findIndex(channel => channel.id === channelId);
  
  // If channel not found, throw error
  if (channelIndex === -1) {
    throw new ApiError('Channel not found', 404);
  }
  
  // Check if user is the channel owner
  if (channels[channelIndex].userId !== userId) {
    throw new ApiError('You are not authorized to delete this channel', 403);
  }
  
  // Remove channel
  channels.splice(channelIndex, 1);
  
  return true;
};

module.exports = {
  createChannel,
  getAllChannels,
  getChannelById,
  getChannelByUserId,
  updateChannel,
  deleteChannel,
};