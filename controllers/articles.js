const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError.js');
const ForbiddenError = require('../errors/ForbiddenError.js');

function getSavedArticles(req, res, next) {
  return Article.find({})
    .then((articles) => res.status(200).send(articles))
    .catch(next);
}

function saveArticle(req, res, next) {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;

  return Article.create({
    owner: req.user._id,
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  })
    .then((card) => res.status(201).send(card))
    .catch(next);
}

function removeArticle(req, res, next) {
  return Article.findOne({ _id: req.params.articleId })
    .then((article) => {
      if (!article) return next(new NotFoundError('Нет статьи с таким id'));

      const isOwner = article.owner.toString() === req.user._id.toString();

      if (!isOwner) return next(new ForbiddenError('Нельзя удалять чужие статьи'));
      return Article.deleteOne(article);
    })
    .then(() => res.status(200).send({ message: 'Статья удалена' }))
    .catch(next);
}

module.exports = {
  getSavedArticles,
  saveArticle,
  removeArticle,
};
