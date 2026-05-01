/**
 * Testimonial Controller — Thin HTTP handler for testimonials.
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const testimonialService = require('../services/TestimonialService');

const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.getVisible();
  ApiResponse.success(res, 'Testimonials fetched', { testimonials });
});

const addTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.create(req.body);
  ApiResponse.created(res, 'Thank you for your review!', { testimonial });
});

module.exports = { getTestimonials, addTestimonial };
