const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { JWT_KEY } = require('../utils/config');
const { AUTH_PERMISSION } = require('../utils/errors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_PERMISSION);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (error) {
    throw new AuthError(AUTH_PERMISSION);
  }
  req.user = payload;
  next();
};

module.exports = auth;
