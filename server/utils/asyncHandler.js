/**
 * Async handler wrapper.
 * Eliminates repetitive try/catch blocks in async route handlers.
 * Passes errors directly to Express error middleware.
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
