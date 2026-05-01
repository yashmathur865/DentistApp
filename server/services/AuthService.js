/**
 * Auth Service — Business logic for authentication.
 * 
 * Design Decision: Service layer sits between controllers and repositories.
 * Controllers handle HTTP concerns (req/res), services handle business logic,
 * repositories handle data access. This separation follows Single Responsibility
 * and makes each layer independently testable.
 */
const doctorRepository = require('../repositories/DoctorRepository');
const AppError = require('../utils/AppError');

class AuthService {
  async login(email, password) {
    const doctor = await doctorRepository.findByEmail(email);
    if (!doctor) {
      throw AppError.unauthorized('Invalid email or password');
    }

    const isMatch = await doctor.comparePassword(password);
    if (!isMatch) {
      throw AppError.unauthorized('Invalid email or password');
    }

    const token = doctor.generateToken();
    return {
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
        clinicName: doctor.clinicName,
      },
    };
  }

  async getProfile(doctorId) {
    const doctor = await doctorRepository.getProfile(doctorId);
    if (!doctor) {
      throw AppError.notFound('Doctor not found');
    }
    return doctor;
  }
}

module.exports = new AuthService();
