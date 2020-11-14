const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
    statusCode: err.status || 500,
  });
  next();
};

module.exports = { errorHandler };
