const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const { protect } = require('../middleware/auth');
const { validate, schemas } = require('../middleware/validate');
const { bookingLimiter } = require('../middleware/rateLimiter');

// Public routes
router.get('/slots/:date', appointmentController.getAvailableSlots);
router.post('/', bookingLimiter, validate(schemas.booking), appointmentController.bookAppointment);

// Protected Admin routes
router.use(protect); // Apply to all routes below
router.get('/', appointmentController.getAppointments);
router.get('/today', appointmentController.getTodayAppointments);
router.get('/stats', appointmentController.getDashboardStats);
router.patch('/:id/status', appointmentController.updateStatus);

module.exports = router;
