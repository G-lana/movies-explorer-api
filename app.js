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
const { signup, signin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { SERVER_ERROR, NOT_FOUND_ERROR } = require('./middlewares/errors');

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

app.post('/signup', signup, createUser);
app.post('/signin', signin, login);

app.use(auth);

app.use('/users', routesUsers);
app.use('/movies', routesMovies);

app.use('*', NOT_FOUND_ERROR);

app.use(errorLogger);
app.use(errors());

app.use(SERVER_ERROR);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
