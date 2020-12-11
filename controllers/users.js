const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError.js');
const BadRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const { JWT_SECRET } = require('../utils/environment');

const SALT = 10;

function createUser(req, res, next) {
  const {
    email, password, name,
  } = req.body;

  return bcrypt.hash(password, SALT, (error, hash) => {
    if (!email || !password) return next(new BadRequestError('Введите валидный email и пароль не менее 2 символов'));
    return User.findOne({ email })
      .then((user) => {
        if (user) return next(new ConflictError('Пользователь с таким email уже есть'));
        return User.create({
          name,
          email,
          password: hash,
        })
          .then(() => res.status(201).send({
            message: `Пользователь ${email} успешно создан!`,
            statusCode: 201,
          }));
      })
      .catch(next);
  });
}

function login(req, res, next) {
  const { email, password } = req.body;
  return User.findOne({ email }).select('+password')
    .then((profile) => {
      if (!profile) return next(new UnauthorizedError('Неправильные почта или пароль'));
      return bcrypt.compare(password, profile.password, (error, isMatched) => {
        if (!isMatched) {
          return next(new UnauthorizedError('Неправильные почта или пароль'));
        }
        const token = jwt.sign({ _id: profile._id }, JWT_SECRET, { expiresIn: '7d' });
        const user = {
          _id: profile._id,
          name: profile.name,
          email: profile.email,
        };
        return res.send({ token, user });
      });
    })
    .catch(next);
}

function getCurrentUser(req, res, next) {
  return User.findOne({ _id: req.user._id })
    .then((user) => {
      if (!user) return next(new NotFoundError('Нет пользователя с таким id'));
      return res.status(200).send(user);
    })
    .catch(next);
}

module.exports = {
  createUser,
  login,
  getCurrentUser,
};
