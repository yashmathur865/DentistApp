/**
 * Gallery Service — Business logic for before/after gallery.
 */
const galleryRepository = require('../repositories/GalleryRepository');

class GalleryService {
  async getVisible() {
    return galleryRepository.getVisible();
  }

  async getByCategory(category) {
    return galleryRepository.getByCategory(category);
  }
}

module.exports = new GalleryService();
