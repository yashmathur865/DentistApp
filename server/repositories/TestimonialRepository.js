/**
 * Testimonial Repository — Data access for Testimonial entity.
 */
const BaseRepository = require('./BaseRepository');
const Testimonial = require('../models/Testimonial');

class TestimonialRepository extends BaseRepository {
  constructor() {
    super(Testimonial);
  }

  async getVisible() {
    return this.model.find({ isVisible: true }).sort({ createdAt: -1 });
  }
}

module.exports = new TestimonialRepository();
