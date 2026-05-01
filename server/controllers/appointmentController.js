/**
 * Appointment Controller — Thin HTTP handler for appointment management.
 * All booking logic (including double-booking prevention) is in AppointmentService.
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const appointmentService = require('../services/AppointmentService');

/**
 * @desc    Get available slots for a date
 * @route   GET /api/appointments/slots/:date
 * @access  Public
 */
const getAvailableSlots = asyncHandler(async (req, res) => {
  const { date } = req.params;
  const result = await appointmentService.getAvailableSlots(date);
  ApiResponse.success(res, 'Available slots fetched', result);
});

/**
 * @desc    Book an appointment
 * @route   POST /api/appointments
 * @access  Public
 */
const bookAppointment = asyncHandler(async (req, res) => {
  const result = await appointmentService.bookAppointment(req.body);
  ApiResponse.created(res, 'Appointment booked successfully!', result);
});

/**
 * @desc    Get all appointments (paginated, filterable)
 * @route   GET /api/appointments
 * @access  Private
 */
const getAppointments = asyncHandler(async (req, res) => {
  const result = await appointmentService.getAppointments(req.query);
  ApiResponse.success(res, 'Appointments fetched', result);
});

/**
 * @desc    Get today's appointments
 * @route   GET /api/appointments/today
 * @access  Private
 */
const getTodayAppointments = asyncHandler(async (req, res) => {
  const appointments = await appointmentService.getTodayAppointments();
  ApiResponse.success(res, "Today's appointments fetched", { appointments });
});

/**
 * @desc    Update appointment status
 * @route   PATCH /api/appointments/:id/status
 * @access  Private
 */
const updateStatus = asyncHandler(async (req, res) => {
  const { status, notes } = req.body;
  const appointment = await appointmentService.updateStatus(req.params.id, status, notes);
  ApiResponse.success(res, `Appointment ${status}`, { appointment });
});

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/appointments/stats
 * @access  Private
 */
const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await appointmentService.getDashboardStats();
  ApiResponse.success(res, 'Dashboard stats fetched', stats);
});

module.exports = {
  getAvailableSlots,
  bookAppointment,
  getAppointments,
  getTodayAppointments,
  updateStatus,
  getDashboardStats,
};
