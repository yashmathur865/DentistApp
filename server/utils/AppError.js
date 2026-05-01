/**
 * Custom application error class.
 * Carries HTTP status code through the middleware chain for proper error responses.
 * 
 * Design Decision: Extending Error allows us to throw domain-specific errors
 * from any layer (repository, service, controller) and handle them uniformly
 * in the error middleware — follows Open/Closed Principle.
 */
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true; // Distinguish operational errors from programming bugs

    // Capture stack trace without this constructor in the trace
    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message) {
    return new AppError(message, 400);
  }

  static unauthorized(message = 'Unauthorized access') {
    return new AppError(message, 401);
  }

  static forbidden(message = 'Forbidden') {
    return new AppError(message, 403);
  }

  static notFound(message = 'Resource not found') {
    return new AppError(message, 404);
  }

  static conflict(message = 'Resource already exists') {
    return new AppError(message, 409);
  }
}

module.exports = AppError;
