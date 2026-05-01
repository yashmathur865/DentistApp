/**
 * Gallery Repository — Data access for GalleryItem entity.
 */
const BaseRepository = require('./BaseRepository');
const GalleryItem = require('../models/GalleryItem');

class GalleryRepository extends BaseRepository {
  constructor() {
    super(GalleryItem);
  }

  async getVisible() {
    return this.model.find({ isVisible: true }).sort({ sortOrder: 1, createdAt: -1 });
  }

  async getByCategory(category) {
    return this.model
      .find({ isVisible: true, category })
      .sort({ sortOrder: 1, createdAt: -1 });
  }
}

module.exports = new GalleryRepository();
