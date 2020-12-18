const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ConflictError = require('../errors/conflict-error');
const NotFoundError = require('../errors/not-found-error');
const User = require('../models/user');

const getUserMe = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    if (!user) {
      throw new NotFoundError('Нет пользователя с таким id');
    }
    res.status(200).send(user);
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
    }
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = await jwt.sign({ _id: user._id });
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
