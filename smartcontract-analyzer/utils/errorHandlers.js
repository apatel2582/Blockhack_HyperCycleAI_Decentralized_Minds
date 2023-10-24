// errorHandlers.js
// common error handlers

// utils/errorHandlers.js

class ErrorHandler extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

/**
 * Handle errors and send response.
 * @param {ErrorHandler} err - The error object.
 * @param {Object} res - The Express response object.
 */
const handleError = (err, res) => {
  const { statusCode, message } = err;
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = {
  ErrorHandler,
  handleError,
};
