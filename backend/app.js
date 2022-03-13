const express = require('express');

const cors = require('cors');

const mongoose = require('mongoose');

const { errors, celebrate, Joi } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

const { NotFoundError } = require('./errors');

const errorHandler = require('./middlewares/error-handler');

const { PORT = 3000 } = process.env;

const { login, createUser } = require('./controllers/users');

const auth = require('./middlewares/auth');

app.use(express.json());// It parses incoming req with JSON payloads and is based on body-parser.

app.use(cors());

async function main() {
  // подключаемся к серверу mongo
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('conect to db');

  await app.listen(PORT);
  console.log(`Listen ${PORT} port`);
}

app.use(requestLogger); // подключаем логгер запросов

// роуты, не требующие авторизации
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^(https?:\/\/)?([\da-z.-]+).([a-z.]{2,6})([/\w.-]*)*\/?$/),
  }),
}), createUser);

// авторизация
app.use(auth);

// роуты, которым авторизация нужна
app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

app.use(errorHandler); // централизованный обработчик

main();
