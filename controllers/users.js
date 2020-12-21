const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const User = require('../models/user');
const { JWT_KEY } = require('../utils/config');

const getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    const { email, name } = user;
    res.status(200).send({ email, name });
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hash,
    });
    res.status(200).send({
      message: 'Пользователь зарегестрирован',
      _id: newUser.id,
      email: newUser.email,
    });
  } catch (error) {
    if (error.name === 'MongoError') {
      next(new ConflictError('Пользователь с таким email уже зарегестрирован'));
    } else {
      next(error);
    }
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    const ret = await bcrypt.compare(password, user.password);
    if (!user || !ret) {
      throw new AuthError('Неправильные почта или пароль');
    }
    const token = await jwt.sign({ _id: user._id }, JWT_KEY, { expiresIn: '7d' });
    res.status(200).send({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserMe,
  createUser,
  loginUser,
};
