const { celebrate, Joi } = require('celebrate');

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.email': 'Пожалуйста, введите валидный email',
        'any.required': 'Email – обязательное поле',
        'string.empty': 'Пожалуйста, введите валидный email',
      }),
    name: Joi.string()
      .required()
      .min(2)
      .max(30)
      .messages({
        'string.min': 'Имя не должно быть короче 2 символов',
        'string.max': 'Имя не должно быть длиннее 30 символов',
        'any.required': 'Имя – обязательное поле',
        'string.empty': 'Пожалуйста, введите валидное имя',
      }),
    password: Joi.string()
      .regex(/^\S+$/)
      .required()
      .trim()
      .messages({
        'string.empty': 'Пожалуйста, введите валидный пароль',
        'string.pattern.base': 'Пожалуйста, введите валидный пароль',
        'any.required': 'Пароль – обязательное поле',
      }),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email()
      .messages({
        'string.email': 'Пожалуйста, введите валидный email',
        'any.required': 'Email – обязательное поле',
        'string.empty': 'Пожалуйста, введите валидный email',
      }),
    password: Joi.string()
      .regex(/^\S+$/)
      .required()
      .trim()
      .messages({
        'string.empty': 'Пожалуйста, введите валидный пароль',
        'string.pattern.base': 'Пожалуйста, введите валидный пароль',
        'any.required': 'Пароль – обязательное поле',
      }),
  }),
});

const validateSaveArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string()
      .required()
      .messages({
        'any.required': 'Ключевое слово – обязательное поле',
        'string.empty': 'Поле ключевое слово не может быть пустым',
      }),
    title: Joi.string()
      .required()
      .messages({
        'any.required': 'Заголовок – обязательное поле',
        'string.empty': 'Поле заголовок не может быть пустым',
      }),
    text: Joi.string()
      .required()
      .messages({
        'any.required': 'Текст статьи – обязательное поле',
        'string.empty': 'Поле текст статьи не может быть пустым',
      }),
    date: Joi.string()
      .required()
      .messages({
        'any.required': 'Дата – обязательное поле',
        'string.empty': 'Поле дата не может быть пустым',
      }),
    source: Joi.string()
      .required()
      .messages({
        'any.required': 'Источник статьи – обязательное поле',
        'string.empty': 'Поле источник статьи не может быть пустым',
      }),
    link: Joi.string()
      .required()
      .regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
      .messages({
        'any.required': 'Ссылка на статью – обязательное поле',
        'string.pattern.base': 'Пожалуйста, введите валидную ссылку на статью',
        'string.empty': 'Поле ссылка на статью не может быть пустым',
      }),
    image: Joi.string()
      .required()
      .regex(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/)
      .messages({
        'any.required': 'Ссылка на изображение – обязательное поле',
        'string.pattern.base': 'Пожалуйста, введите валидную ссылку на изображение',
        'string.empty': 'Поле ссылка на изображение не может быть пустым',
      }),
  }),
});

const validateRemoveArticle = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string()
      .hex()
      .length(24)
      .required()
      .messages({
        'any.required': 'Необходим ID статьи',
        'string.hex': 'Пожалуйста, пришлите валидный ID статьи',
        'string.length': 'Пожалуйста, пришлите валидный ID статьи',
      }),
  }),
});

module.exports = {
  validateCreateUser,
  validateLogin,
  validateSaveArticle,
  validateRemoveArticle,
};
