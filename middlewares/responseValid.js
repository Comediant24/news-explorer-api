const { celebrate, Joi } = require('celebrate');
const isEmail = require('validator/lib/isEmail');

const validationArticlePost = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().custom((value, helpers) => {
      if (isEmail(value) === true) return value;
      return helpers.error('any.invalid');
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (isEmail(value) === true) return value;
      return helpers.error('any.invalid');
    }),
  }),
});

const validationArticleDelete = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validationArticlePost,
  validationArticleDelete,
};
