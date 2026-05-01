/**
 * Application-wide constants.
 * Centralized to avoid magic strings throughout the codebase.
 * All enums and static data should live here.
 */

const APPOINTMENT_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'rejected',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
};

const DAYS_OF_WEEK = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

// Dental clinic time slots (30-minute intervals)
const TIME_SLOTS = [
  '09:00 AM', '09:30 AM',
  '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM',
  '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM',
  '06:00 PM', '06:30 PM',
];

// Dental service categories
const SERVICE_CATEGORIES = {
  PREVENTIVE: 'preventive',
  RESTORATIVE: 'restorative',
  COSMETIC: 'cosmetic',
  ORTHODONTIC: 'orthodontic',
  SURGICAL: 'surgical',
};

module.exports = {
  APPOINTMENT_STATUS,
  DAYS_OF_WEEK,
  TIME_SLOTS,
  SERVICE_CATEGORIES,
};
