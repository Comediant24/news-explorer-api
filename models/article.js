const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongodb');
const isUrl = require('validator/lib/isURL');

const articleSchema = new Schema({
  keyword: {
    type: String,
    required: [true, 'Поле ключевого слова обязательное'],
  },
  title: {
    type: String,
    required: [true, 'Поле заголовка обязательное'],
  },
  text: {
    type: String,
    required: [true, 'Поле текста обязательное'],
  },
  date: {
    type: String,
    required: [true, 'Поле даты обязательное'],
  },
  source: {
    type: String,
    required: [true, 'Поле источника обязательное'],
  },
  link: {
    type: String,
    required: [true, 'Поле ссылки на статью обязательное'],
    validate: {
      validator(v) {
        return isUrl(v);
      },
      message: 'Некорректный url статьи',
    },
  },
  image: {
    type: String,
    required: [true, 'Поле ссылки на иллюстрацию обязательное'],
    validate: {
      validator(v) {
        return isUrl(v);
      },
      message: 'Некорректный url иллюстрации',
    },
  },
  owner: {
    type: ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
});

module.exports = model('article', articleSchema);
