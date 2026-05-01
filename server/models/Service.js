/**
 * Dental Service Model.
 * Represents a dental treatment/service offered by the clinic.
 * 
 * Design Decision: Services are stored in DB rather than hardcoded so the admin
 * can manage them in the future. Category field enables frontend filtering.
 * sortOrder enables custom display ordering.
 */
const mongoose = require('mongoose');
const { SERVICE_CATEGORIES } = require('../utils/constants');

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      maxlength: [100, 'Service name cannot exceed 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Service description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    icon: {
      type: String,
      default: '🦷', // Emoji icon fallback
    },
    duration: {
      type: String,
      default: '30 mins',
    },
    price: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: Object.values(SERVICE_CATEGORIES),
      default: SERVICE_CATEGORIES.PREVENTIVE,
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    sortOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Index for sorted active services query
serviceSchema.index({ isActive: 1, sortOrder: 1 });

module.exports = mongoose.model('Service', serviceSchema);
