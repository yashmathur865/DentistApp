/**
 * Gallery Item Model.
 * Before/After dental treatment photos.
 * 
 * Design Decision: Using URL strings for images rather than file uploads 
 * for simplicity. In production, these would point to a CDN or cloud storage.
 * Category field enables frontend filtering by treatment type.
 */
const mongoose = require('mongoose');

const galleryItemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      default: '',
      maxlength: [300, 'Description cannot exceed 300 characters'],
    },
    beforeImage: {
      type: String,
      required: [true, 'Before image URL is required'],
    },
    afterImage: {
      type: String,
      required: [true, 'After image URL is required'],
    },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    isVisible: {
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

module.exports = mongoose.model('GalleryItem', galleryItemSchema);
