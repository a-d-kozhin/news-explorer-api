class NotFoundError extends Error {
  constructor(message, ...rest) {
    super(...rest);
    this.status = 404;
    this.message = message;
    this.statusCode = this.status;
  }
}

module.exports = NotFoundError;
