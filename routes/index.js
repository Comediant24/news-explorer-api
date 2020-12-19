const router = require('express').Router();
const userRouter = require('./users.js');
const articleRouter = require('./articles.js');
const { createUser, loginUser } = require('../controllers/users');
const { validationUserRegister, validationUserLogin } = require('../middlewares/responseValid');
const auth = require('../middlewares/auth');

router.post('/signup', validationUserRegister, createUser);
router.post('/signin', validationUserLogin, loginUser);
router.use(auth);
router.use('/', userRouter, articleRouter);

module.exports = router;
