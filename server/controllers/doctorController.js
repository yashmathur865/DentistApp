/**
 * Doctor Controller — Thin HTTP handler for doctor profile.
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const doctorRepository = require('../repositories/DoctorRepository');

const getDoctorProfile = asyncHandler(async (req, res) => {
  // Get the first doctor (single-doctor clinic setup)
  const doctors = await doctorRepository.findAll({}, { select: '-password' });
  if (!doctors.length) {
    return ApiResponse.notFound(res, 'No doctor profile found');
  }
  ApiResponse.success(res, 'Doctor profile fetched', { doctor: doctors[0] });
});

module.exports = { getDoctorProfile };
