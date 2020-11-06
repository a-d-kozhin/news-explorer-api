class ConflictError extends Error {
  constructor(message, ...rest) {
    super(...rest);
    this.status = 409;
    this.message = message;
    this.statusCode = this.status;
  }
}

module.exports = ConflictError;
