/**
 * Service Service — Business logic for dental services management.
 */
const serviceRepository = require('../repositories/ServiceRepository');

class ServiceService {
  async getAllActive() {
    return serviceRepository.getActiveServices();
  }

  async getById(id) {
    return serviceRepository.findById(id);
  }

  async getByCategory(category) {
    return serviceRepository.getByCategory(category);
  }
}

module.exports = new ServiceService();
