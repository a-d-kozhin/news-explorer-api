const router = require('express').Router();
const { auth } = require('../middlewares/auth');

const { getSavedArticles, saveArticle, removeArticle } = require('../controllers/articles');

router.get('/articles', auth, getSavedArticles);
router.post('/articles', auth, saveArticle);
router.delete('/articles/:articleId', auth, removeArticle);

module.exports = { router };
