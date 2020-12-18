const router = require('express').Router();
const { getArticles, createArticle, deleteArticle } = require('../controllers/articles');
const { validationArticlePost, validationArticleDelete } = require('../middlewares/responseValid');

router.get('/articles', getArticles);
router.post('/articles', validationArticlePost, createArticle);
router.delete('/articles/:articleId', validationArticleDelete, deleteArticle);

module.exports = router;
