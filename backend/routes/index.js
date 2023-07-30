const router = require('express').Router();
const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFoundError = require('../utils/errors/NotFoundError');

router.use('/cards', cardsRouter);
router.use('/users', usersRouter);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
