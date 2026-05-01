/**
 * Doctor (Admin) Model.
 * Represents the dentist who owns/manages the clinic.
 * 
 * Design Decision: Password hashing is handled at the model layer via pre-save
 * hooks, ensuring passwords are always hashed regardless of which service creates
 * the doctor. Token generation is also co-located here (Single Responsibility
 * for authentication-related concerns of the Doctor entity).
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // Don't include password in queries by default
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
    },
    qualifications: {
      type: String,
      trim: true,
      default: '',
    },
    experience: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
      maxlength: [2000, 'About cannot exceed 2000 characters'],
    },
    // Clinic information embedded for single-doctor simplicity
    // Can be extracted to a separate Clinic model for multi-doctor support later
    clinicName: {
      type: String,
      default: 'SmileCare Dental Clinic',
      trim: true,
    },
    clinicAddress: {
      type: String,
      default: '',
      trim: true,
    },
    clinicCity: {
      type: String,
      default: '',
      trim: true,
    },
    clinicState: {
      type: String,
      default: '',
      trim: true,
    },
    clinicPincode: {
      type: String,
      default: '',
      trim: true,
    },
    clinicPhone: {
      type: String,
      default: '',
      trim: true,
    },
    whatsappNumber: {
      type: String,
      default: '',
      trim: true,
    },
    mapEmbedUrl: {
      type: String,
      default: '',
    },
    consultationFee: {
      type: Number,
      default: 500,
    },
    clinicAbout: {
      type: String,
      default: '',
      maxlength: [3000, 'Clinic about cannot exceed 3000 characters'],
    },
    timings: {
      type: [
        {
          day: { type: String, required: true },
          isOpen: { type: Boolean, default: true },
          openTime: { type: String, default: '09:00 AM' },
          closeTime: { type: String, default: '06:00 PM' },
        },
      ],
      default: () => {
        const { DAYS_OF_WEEK } = require('../utils/constants');
        return DAYS_OF_WEEK.map((day) => ({
          day,
          isOpen: day !== 'Sunday',
          openTime: '09:00 AM',
          closeTime: '06:00 PM',
        }));
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
doctorSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
doctorSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Generate JWT token
doctorSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

module.exports = mongoose.model('Doctor', doctorSchema);
