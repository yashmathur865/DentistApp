/**
 * Gallery Controller — Thin HTTP handler for before/after gallery.
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const galleryService = require('../services/GalleryService');

const getGalleryItems = asyncHandler(async (req, res) => {
  const items = await galleryService.getVisible();
  ApiResponse.success(res, 'Gallery items fetched', { items });
});

module.exports = { getGalleryItems };
