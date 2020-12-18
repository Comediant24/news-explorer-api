/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');
const AuthError = require('../errors/auth-error');

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Поле имя пользователя обязательное'],
    minlength: [2, 'Минимальная длина имени 2 символа'],
    maxlength: [30, 'Максимальная длина имени 30 символов'],
  },
  email: {
    type: String,
    required: [true, 'Поле email пользователя обязательное'],
    unique: [true, 'такой email уже занят'],
    validate: {
      validator(v) {
        return isEmail(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: [true, 'Поле password обязательное'],
    select: false,
  },
});

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');
  const ret = await bcrypt.compare(password, user.password);
  if (!user || !ret) return Promise.reject(new AuthError('Неправильные почта или пароль'));
  return user;
};

module.exports = model('user', userSchema);
