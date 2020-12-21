const { Schema, model } = require('mongoose');
const isEmail = require('validator/lib/isEmail');

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

module.exports = model('user', userSchema);
