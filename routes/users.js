const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateCreateUser, validateLogin } = require('../middlewares/reqValidation');
const { createUser, login, getCurrentUser } = require('../controllers/users');

router.post('/signup', validateCreateUser, createUser);
router.post('/signin', validateLogin, login);
router.get('/users/me', auth, getCurrentUser);

module.exports = { router };
