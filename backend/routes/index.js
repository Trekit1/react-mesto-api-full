const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const routerUser = require('./users');
const routerCard = require('./cards');
const { login, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const { reg } = require('../constants');

router.get('/api/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.post('/api/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.post('/api/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(reg),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.use(auth);

router.use('/api/users', routerUser);

router.use('/api/cards', routerCard);

router.use('/', (req, res, next) => {
  next(new NotFoundError('Данная страница не найдена'));
});

module.exports = router;
