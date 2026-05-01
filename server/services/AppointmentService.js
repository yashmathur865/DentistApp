/**
 * Appointment Service — Business logic for appointment management.
 * 
 * Contains the core booking logic including double-booking prevention.
 * Depends on AppointmentRepository (Dependency Inversion) for data access.
 */
const appointmentRepository = require('../repositories/AppointmentRepository');
const Patient = require('../models/Patient');
const { TIME_SLOTS, APPOINTMENT_STATUS } = require('../utils/constants');
const AppError = require('../utils/AppError');

class AppointmentService {
  /**
   * Get available time slots for a given date.
   * Cross-references all TIME_SLOTS with already-booked slots.
   */
  async getAvailableSlots(date) {
    const bookedSlots = await appointmentRepository.getBookedSlots(date);

    const slots = TIME_SLOTS.map((slot) => ({
      time: slot,
      available: !bookedSlots.includes(slot),
    }));

    return { slots, date };
  }

  /**
   * Book a new appointment.
   * Implements double-booking prevention by checking existing slots.
   */
  async bookAppointment({ name, phone, email, date, timeSlot, serviceId, problem }) {
    // Double-booking prevention: check if slot is taken
    const existing = await appointmentRepository.findByDateAndSlot(date, timeSlot);
    if (existing) {
      throw AppError.conflict('This time slot is already booked. Please select another.');
    }

    // Find or create patient record
    const patient = await Patient.findOrCreate({ name, phone, email });

    // Create the appointment
    console.log('Creating appointment with data:', {
      patientId: patient._id,
      date: new Date(date),
      timeSlot,
      serviceId,
    });
    
    const appointment = await appointmentRepository.create({
      patientId: patient._id,
      date: new Date(date),
      timeSlot,
      serviceId: serviceId || undefined,
      problem: problem || '',
    });

    return {
      appointment: {
        id: appointment._id,
        date: appointment.date,
        timeSlot: appointment.timeSlot,
        status: appointment.status,
      },
      patient: {
        name: patient.name,
        phone: patient.phone,
      },
    };
  }

  /**
   * Get all appointments with optional filters and pagination.
   */
  async getAppointments({ status, date, page = 1, limit = 20 }) {
    const filter = {};

    if (status) filter.status = status;
    if (date) {
      filter.date = {
        $gte: new Date(new Date(date).setHours(0, 0, 0, 0)),
        $lt: new Date(new Date(date).setHours(23, 59, 59, 999)),
      };
    }

    return appointmentRepository.getFiltered(filter, { page, limit });
  }

  /**
   * Get today's appointments.
   */
  async getTodayAppointments() {
    return appointmentRepository.getTodayAppointments();
  }

  /**
   * Update appointment status with validation.
   */
  async updateStatus(appointmentId, status, notes) {
    if (!Object.values(APPOINTMENT_STATUS).includes(status)) {
      throw AppError.badRequest('Invalid appointment status');
    }

    const appointment = await appointmentRepository.findById(appointmentId, {
      populate: 'patientId',
    });

    if (!appointment) {
      throw AppError.notFound('Appointment not found');
    }

    appointment.status = status;
    if (notes) appointment.notes = notes;
    await appointment.save();

    return appointment;
  }

  /**
   * Get dashboard statistics.
   */
  async getDashboardStats() {
    const statusCounts = await appointmentRepository.getStatusCounts();
    const todayAppointments = await appointmentRepository.getTodayAppointments();
    const totalPatients = await Patient.countDocuments();

    return {
      totalAppointments: Object.values(statusCounts).reduce((sum, c) => sum + c, 0),
      todayCount: todayAppointments.length,
      pendingCount: statusCounts[APPOINTMENT_STATUS.PENDING] || 0,
      confirmedCount: statusCounts[APPOINTMENT_STATUS.CONFIRMED] || 0,
      completedCount: statusCounts[APPOINTMENT_STATUS.COMPLETED] || 0,
      cancelledCount: statusCounts[APPOINTMENT_STATUS.CANCELLED] || 0,
      totalPatients,
      todayAppointments,
    };
  }
}

module.exports = new AppointmentService();
