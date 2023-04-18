const { STATUS_INTERNAL_SERVER_ERROR } = require('../utils/constants');
const NotFoundError = require('../errors/NotFoundError');

module.exports.SERVER_ERROR = ((err, req, res, next) => {
  const statusCode = err.status || STATUS_INTERNAL_SERVER_ERROR;
  const message = statusCode === STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});
module.exports.NOT_FOUND_ERROR = ((req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});
