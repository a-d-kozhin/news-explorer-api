const appRouter = require('express').Router();
const usersRouter = require('./users').router;
const articlesRouter = require('./articles').router;

appRouter.use(usersRouter);
appRouter.use(articlesRouter);

module.exports = { appRouter };
