/**
 * Video service
 * Contains business logic for video-related operations
 */
const { Video } = require('../models/videoModel');
const ApiError = require('../utils/apiError');

// In-memory storage for videos (will be replaced with database in Assignment 2)
const videos = [];

/**
 * Create a new video
 * 
 * @param {Object} videoData - Video data
 * @returns {Object} Created video
 */
const createVideo = async (videoData) => {
  // Create new video
  const newVideo = new Video(videoData);
  
  // Save video to storage
  videos.push(newVideo);
  
  return newVideo;
};

/**
 * Get all videos
 * 
 * @param {Object} filters - Optional filters
 * @returns {Array} List of videos
 */
const getAllVideos = async (filters = {}) => {
  let filteredVideos = [...videos];
  
  // Apply filters
  if (filters.channelId) {
    filteredVideos = filteredVideos.filter(video => video.channelId === filters.channelId);
  }
  
  if (filters.category) {
    filteredVideos = filteredVideos.filter(video => video.category === filters.category);
  }
  
  if (filters.visibility) {
    filteredVideos = filteredVideos.filter(video => video.visibility === filters.visibility);
  }
  
  return filteredVideos;
};

/**
 * Get video by ID
 * 
 * @param {String} videoId - Video ID
 * @returns {Object} Video
 */
const getVideoById = async (videoId) => {
  // Find video by ID
  const video = videos.find(video => video.id === videoId);
  
  // If video not found, throw error
  if (!video) {
    throw new ApiError('Video not found', 404);
  }
  
  return video;
};

/**
 * Update video
 * 
 * @param {String} videoId - Video ID
 * @param {Object} updateData - Data to update
 * @returns {Object} Updated video
 */
const updateVideo = async (videoId, updateData) => {
  // Find video index
  const videoIndex = videos.findIndex(video => video.id === videoId);
  
  // If video not found, throw error
  if (videoIndex === -1) {
    throw new ApiError('Video not found', 404);
  }
  
  // Update video
  const updatedVideo = {
    ...videos[videoIndex],
    ...updateData,
    updatedAt: new Date().toISOString(),
  };
  
  // Save updated video
  videos[videoIndex] = updatedVideo;
  
  return updatedVideo;
};

/**
 * Delete video
 * 
 * @param {String} videoId - Video ID
 * @returns {Boolean} Deletion success
 */
const deleteVideo = async (videoId) => {
  // Find video index
  const videoIndex = videos.findIndex(video => video.id === videoId);
  
  // If video not found, throw error
  if (videoIndex === -1) {
    throw new ApiError('Video not found', 404);
  }
  
  // Remove video
  videos.splice(videoIndex, 1);
  
  return true;
};

/**
 * Increment video view count
 * 
 * @param {String} videoId - Video ID
 * @returns {Object} Updated video
 */
const incrementViewCount = async (videoId) => {
  // Find video index
  const videoIndex = videos.findIndex(video => video.id === videoId);
  
  // If video not found, throw error
  if (videoIndex === -1) {
    throw new ApiError('Video not found', 404);
  }
  
  // Increment view count
  videos[videoIndex].views += 1;
  videos[videoIndex].updatedAt = new Date().toISOString();
  
  return videos[videoIndex];
};

module.exports = {
  createVideo,
  getAllVideos,
  getVideoById,
  updateVideo,
  deleteVideo,
  incrementViewCount,
};