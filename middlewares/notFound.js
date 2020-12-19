const NotFoundError = require('../errors/not-found-error');

const notFound = (req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
};

module.exports = notFound;
