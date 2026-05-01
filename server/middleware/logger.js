/**
 * Request logging middleware.
 * Uses morgan for structured HTTP request logging.
 * Different formats for development vs production.
 */
const morgan = require('morgan');

const logger = process.env.NODE_ENV === 'production'
  ? morgan('combined')
  : morgan('dev');

module.exports = logger;
