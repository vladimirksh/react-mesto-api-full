const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Произошла ошибка';
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
