/**
 * Doctor Repository — Data access for Doctor entity.
 * Extends BaseRepository with doctor-specific queries.
 */
const BaseRepository = require('./BaseRepository');
const Doctor = require('../models/Doctor');

class DoctorRepository extends BaseRepository {
  constructor() {
    super(Doctor);
  }

  async findByEmail(email) {
    return this.model.findOne({ email }).select('+password');
  }

  async getProfile(id) {
    return this.model.findById(id).select('-password');
  }
}

// Singleton instance — ensures one repository per entity
module.exports = new DoctorRepository();
