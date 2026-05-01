/**
 * Auth Controller — Thin HTTP handler for authentication.
 * Delegates all business logic to AuthService.
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const authService = require('../services/AuthService');

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login(email, password);
  ApiResponse.success(res, 'Login successful', result);
});

const getProfile = asyncHandler(async (req, res) => {
  const doctor = await authService.getProfile(req.doctor._id);
  ApiResponse.success(res, 'Profile fetched', { doctor });
});

module.exports = { login, getProfile };
