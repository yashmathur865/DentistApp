/**
 * Validation middleware factory.
 * Takes a validation schema and returns middleware that validates req.body.
 * 
 * Design Decision: Schema-driven validation keeps validation rules co-located
 * and reusable. New schemas can be added without modifying the middleware.
 */
const ApiResponse = require('../utils/apiResponse');

const validate = (schema) => (req, res, next) => {
  const errors = [];

  for (const [field, rules] of Object.entries(schema)) {
    const value = req.body[field];

    if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
      errors.push(`${rules.label || field} is required`);
      continue;
    }

    if (value) {
      if (rules.minLength && value.length < rules.minLength) {
        errors.push(`${rules.label || field} must be at least ${rules.minLength} characters`);
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        errors.push(`${rules.label || field} cannot exceed ${rules.maxLength} characters`);
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        errors.push(`${rules.label || field} is invalid`);
      }
      if (rules.min !== undefined && Number(value) < rules.min) {
        errors.push(`${rules.label || field} must be at least ${rules.min}`);
      }
      if (rules.max !== undefined && Number(value) > rules.max) {
        errors.push(`${rules.label || field} cannot exceed ${rules.max}`);
      }
    }
  }

  if (errors.length > 0) {
    return ApiResponse.badRequest(res, 'Validation failed', errors);
  }

  next();
};

// Pre-built validation schemas for dental clinic
const schemas = {
  login: {
    email: { required: true, label: 'Email', pattern: /^\S+@\S+\.\S+$/ },
    password: { required: true, label: 'Password', minLength: 6 },
  },
  booking: {
    name: { required: true, label: 'Patient name', minLength: 2 },
    phone: { required: true, label: 'Phone number' },
    date: { required: true, label: 'Appointment date' },
    timeSlot: { required: true, label: 'Time slot' },
  },
  testimonial: {
    patientName: { required: true, label: 'Your name', minLength: 2 },
    rating: { required: true, label: 'Rating', min: 1, max: 5 },
    comment: { required: true, label: 'Comment', minLength: 10 },
  },
};

module.exports = { validate, schemas };
