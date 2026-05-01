/**
 * Service Repository — Data access for dental Service entity.
 */
const BaseRepository = require('./BaseRepository');
const Service = require('../models/Service');

class ServiceRepository extends BaseRepository {
  constructor() {
    super(Service);
  }

  async getActiveServices() {
    return this.model.find({ isActive: true }).sort({ sortOrder: 1, createdAt: 1 });
  }

  async getByCategory(category) {
    return this.model.find({ isActive: true, category }).sort({ sortOrder: 1 });
  }
}

module.exports = new ServiceRepository();
