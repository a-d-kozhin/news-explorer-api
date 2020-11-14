const appRouter = require('express').Router();
const usersRouter = require('./users').router;
const articlesRouter = require('./articles').router;
const NotFoundError = require('../errors/NotFoundError');

appRouter.use(usersRouter);
appRouter.use(articlesRouter);
appRouter.all('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));
module.exports = { appRouter };
