require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const mongoose = require('mongoose');
const { appRouter } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/error-handler');
const { rateLimiter } = require('./middlewares/rateLimiter');
const { PORT, DB } = require('./utils/environment');

const app = express();
app.use(helmet());
app.use(cors());

const allowedCors = [
  'http://news-x.students.nomoreparties.co',
  'http://www.news-x.students.nomoreparties.co',
  'https://news-x.students.nomoreparties.co',
  'https://www.news-x.students.nomoreparties.co',
  'localhost:3000',
];

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.set('trust proxy', 1);
app.use(rateLimiter);

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(requestLogger);
app.use(appRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
