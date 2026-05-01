/**
 * Testimonial Service — Business logic for testimonials.
 */
const testimonialRepository = require('../repositories/TestimonialRepository');

class TestimonialService {
  async getVisible() {
    return testimonialRepository.getVisible();
  }

  async create(data) {
    return testimonialRepository.create(data);
  }
}

module.exports = new TestimonialService();
