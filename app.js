require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { appRouter } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimiter } = require('./middlewares/rateLimiter');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(helmet());
app.use(cors());

app.set('trust proxy', 1);
app.use(rateLimiter);

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(requestLogger);

app.use(appRouter);

app.all('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

app.use(errorLogger);
app.use(errors());

const { PORT = 3000 } = process.env;

app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
    statusCode: err.status || 500,
  });
  next();
});

app.listen(PORT);
