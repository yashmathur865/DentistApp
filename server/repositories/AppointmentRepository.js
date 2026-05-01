/**
 * Appointment Repository — Data access for Appointment entity.
 * Extends BaseRepository with appointment-specific queries like
 * slot availability and date range filtering.
 */
const BaseRepository = require('./BaseRepository');
const Appointment = require('../models/Appointment');
const { APPOINTMENT_STATUS } = require('../utils/constants');

class AppointmentRepository extends BaseRepository {
  constructor() {
    super(Appointment);
  }

  /**
   * Find a booking for a specific date and time slot that is active.
   * Used for double-booking prevention.
   */
  async findByDateAndSlot(date, timeSlot) {
    const startOfDay = new Date(new Date(date).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(date).setHours(23, 59, 59, 999));

    return this.model.findOne({
      date: { $gte: startOfDay, $lt: endOfDay },
      timeSlot,
      status: { $in: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.CONFIRMED] },
    });
  }

  /**
   * Get all booked slots for a given date.
   * Returns array of timeSlot strings that are taken.
   */
  async getBookedSlots(date) {
    const startOfDay = new Date(new Date(date).setHours(0, 0, 0, 0));
    const endOfDay = new Date(new Date(date).setHours(23, 59, 59, 999));

    const appointments = await this.model
      .find({
        date: { $gte: startOfDay, $lt: endOfDay },
        status: { $in: [APPOINTMENT_STATUS.PENDING, APPOINTMENT_STATUS.CONFIRMED] },
      })
      .select('timeSlot');

    return appointments.map((a) => a.timeSlot);
  }

  /**
   * Get appointments for today with patient details.
   */
  async getTodayAppointments() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return this.model
      .find({ date: { $gte: today, $lt: tomorrow } })
      .populate('patientId', 'name phone email')
      .populate('serviceId', 'name')
      .sort({ timeSlot: 1 });
  }

  /**
   * Paginated appointments with filters and patient population.
   */
  async getFiltered(filter = {}, options = {}) {
    const {
      page = 1,
      limit = 20,
      sort = { date: -1, createdAt: -1 },
    } = options;

    const skip = (page - 1) * limit;
    const [docs, total] = await Promise.all([
      this.model
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(Number(limit))
        .populate('patientId', 'name phone email')
        .populate('serviceId', 'name'),
      this.model.countDocuments(filter),
    ]);

    console.log(`Fetched ${docs.length} appointments for filter:`, filter);

    return {
      appointments: docs,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Count appointments by status for dashboard stats.
   */
  async getStatusCounts() {
    const results = await this.model.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]);

    const counts = {};
    results.forEach((r) => {
      counts[r._id] = r.count;
    });
    return counts;
  }
}

module.exports = new AppointmentRepository();
