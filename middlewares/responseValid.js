const { celebrate, Joi } = require('celebrate');
const isUrl = require('validator/lib/isURL');

const validationArticlePost = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value) === true) return value;
      return helpers.error('any.invalid');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (isUrl(value) === true) return value;
      return helpers.error('any.invalid');
    }),
  }),
});

const validationArticleDelete = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex(),
  }),
});

const validationUserRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).trim(),
  }),
});

const validationUserLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6).trim(),
  }),
});

module.exports = {
  validationArticlePost,
  validationArticleDelete,
  validationUserRegister,
  validationUserLogin,
};
