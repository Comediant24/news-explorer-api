const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const Article = require('../models/article');

const getArticles = async (req, res, next) => {
  try {
    const Articles = await Article.find({});
    res.status(200).send(Articles);
  } catch (error) {
    next(error);
  }
};

const createArticle = async (req, res, next) => {
  const {
    keyword, title, text, date, source, link, image,
  } = req.body;
  const owner = req.user._id;
  try {
    const newArticle = await Article.create({
      keyword, title, text, date, source, link, image, owner,
    });
    res.status(200).send(newArticle);
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError('Ошибка валидации! Некорректный url'));
    }
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const delArticle = await Article.findByIdAndRemove({ _id: req.params.articleId });
    if (!delArticle) {
      throw new NotFoundError('Карточка не найдена');
    } else if (delArticle.owner.toString() !== req.user._id) {
      throw new ForbiddenError('Нельзя удалить карточку другого пользователя');
    }
    res.status(200).send({ message: `Карточка удалена ${delArticle}` });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
