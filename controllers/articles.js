const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const Article = require('../models/article');
const {
  URL_BAD_REQUESTS, NOT_FOUND_ARTICLE, FORBIDDEN_DELETE_ARTICLE,
} = require('../utils/errors');

const getArticles = async (req, res, next) => {
  const owner = req.user._id;
  try {
    const Articles = await Article.find({ owner })
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
    await Article.create({
      keyword, title, text, date, source, link, image, owner,
    });
    res.status(200).send({
      keyword, title, text, date, source, link, image,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      next(new ValidationError(URL_BAD_REQUESTS));
    } else {
      next(error);
    }
  }
};

const deleteArticle = async (req, res, next) => {
  try {
    const { articleId } = req.params;
    const findArticle = await Article.findById(articleId).select('+owner');
    if (!findArticle) {
      throw new NotFoundError(NOT_FOUND_ARTICLE);
    } else if (findArticle.owner.toString() !== req.user._id) {
      throw new ForbiddenError(FORBIDDEN_DELETE_ARTICLE);
    }
    const delArticle = await Article.findByIdAndRemove(articleId);
    res.status(200).send({ message: 'Карточка удалена', article: delArticle });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle,
};
