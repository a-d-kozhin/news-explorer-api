class ForbiddenError extends Error {
  constructor(message, ...rest) {
    super(...rest);
    this.status = 403;
    this.message = message;
    this.statusCode = this.status;
  }
}

module.exports = ForbiddenError;
