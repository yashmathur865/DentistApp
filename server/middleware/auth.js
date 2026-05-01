/**
 * JWT Authentication Middleware.
 * Verifies Bearer token from Authorization header and attaches doctor to request.
 */
const jwt = require('jsonwebtoken');
const Doctor = require('../models/Doctor');
const ApiResponse = require('../utils/apiResponse');

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return ApiResponse.unauthorized(res, 'Not authorized. Please log in.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const doctor = await Doctor.findById(decoded.id);
    if (!doctor) {
      return ApiResponse.unauthorized(res, 'Doctor account not found.');
    }

    req.doctor = doctor;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return ApiResponse.unauthorized(res, 'Invalid token.');
    }
    if (error.name === 'TokenExpiredError') {
      return ApiResponse.unauthorized(res, 'Token expired. Please log in again.');
    }
    return ApiResponse.error(res, 'Authentication error.');
  }
};

module.exports = { protect };
