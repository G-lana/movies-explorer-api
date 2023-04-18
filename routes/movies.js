const routesMovies = require('express').Router();
const { postMovie, removeMovie } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

routesMovies.get('/', getMovies);
routesMovies.post('/', postMovie, createMovie);
routesMovies.delete('/:_id', removeMovie, deleteMovie);

module.exports = routesMovies;
