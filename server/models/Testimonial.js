/**
 * Testimonial Model.
 * Patient reviews/testimonials displayed on the public website.
 * 
 * Design Decision: isVisible flag allows admin to moderate testimonials before
 * they appear on the public site. treatmentType links to the service category
 * for filtering on the frontend.
 */
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    treatmentType: {
      type: String,
      default: 'General',
      trim: true,
    },
    isVisible: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Testimonial', testimonialSchema);
