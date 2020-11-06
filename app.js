require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users').router;
const NotFoundError = require('./errors/NotFoundError');

const app = express();

app.use(cors());

mongoose.connect('mongodb://localhost:27017/newsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());

app.use(usersRouter);

const { PORT = 3000 } = process.env;

app.get('*', (req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден')));

app.use((err, req, res) => res.status(err.status || 500).send({
  message: err.message,
  statusCode: err.status || 500,
}));

app.listen(PORT);
