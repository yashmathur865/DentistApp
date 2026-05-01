/**
 * Service Controller — Thin HTTP handler for dental services.
 */
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/apiResponse');
const serviceService = require('../services/ServiceService');

const getAllServices = asyncHandler(async (req, res) => {
  const services = await serviceService.getAllActive();
  ApiResponse.success(res, 'Services fetched', { services });
});

const getServiceById = asyncHandler(async (req, res) => {
  const service = await serviceService.getById(req.params.id);
  if (!service) {
    return ApiResponse.notFound(res, 'Service not found');
  }
  ApiResponse.success(res, 'Service fetched', { service });
});

module.exports = { getAllServices, getServiceById };
