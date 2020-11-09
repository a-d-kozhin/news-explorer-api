const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { validateSaveArticle, validateRemoveArticle } = require('../middlewares/reqValidation');
const { getSavedArticles, saveArticle, removeArticle } = require('../controllers/articles');

router.get('/articles', auth, getSavedArticles);
router.post('/articles', auth, validateSaveArticle, saveArticle);
router.delete('/articles/:articleId', auth, validateRemoveArticle, removeArticle);

module.exports = { router };
