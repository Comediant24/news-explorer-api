const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const { JWT_KEY } = require('../utils/config');

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_KEY);
  } catch (error) {
    throw new AuthError('Необходима авторизация');
  }
  req.user = payload;
  next();
};

module.exports = auth;
