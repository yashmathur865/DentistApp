/**
 * Patient Model.
 * Represents a patient who books appointments.
 * 
 * Design Decision: findOrCreate static method prevents duplicate patient records
 * when the same person books multiple appointments. Phone is the unique identifier
 * since not all patients provide email.
 */
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      index: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Find existing patient by phone or create a new one.
 * Prevents duplicate patient records across multiple bookings.
 */
patientSchema.statics.findOrCreate = async function ({ name, phone, email }) {
  let patient = await this.findOne({ phone });
  if (patient) {
    // Update name/email if provided (patient may have updated details)
    if (name) patient.name = name;
    if (email) patient.email = email;
    await patient.save();
    return patient;
  }
  return this.create({ name, phone, email: email || '' });
};

module.exports = mongoose.model('Patient', patientSchema);
