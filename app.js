/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routesUsers = require('./routes/users');
const routesMovies = require('./routes/movies');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { validateLogin, validateCreateUser } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { STATUS_INTERNAL_SERVER_ERROR } = require('./utils/constants');
const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3001 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/moviesdb';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`Connected to database on ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Error on database connection');
    console.error(err);
  });

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cookieParser());
app.use(requestLogger);

app.post('/signup', validateCreateUser, createUser);
app.post('/signin', validateLogin, login);

app.use(auth);

app.use('/users', routesUsers);
app.use('/movies', routesMovies);

app.use('*', (req, res, next) => {
  const error = new NotFoundError('Запрашиваемый ресурс не найден');
  next(error);
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const statusCode = err.status || STATUS_INTERNAL_SERVER_ERROR;
  const message = statusCode === STATUS_INTERNAL_SERVER_ERROR ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
