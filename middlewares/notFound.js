const NotFoundError = require('../errors/not-found-error');
const { NOT_FOUND } = require('../utils/errors');

const notFound = (req, res, next) => {
  next(new NotFoundError(NOT_FOUND));
};

module.exports = notFound;
