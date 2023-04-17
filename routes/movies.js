const routesMovies = require('express').Router();
const { validateCreateMovie, validateMovieId } = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

routesMovies.get('/', getMovies);
routesMovies.post('/', validateCreateMovie, createMovie);
routesMovies.delete('/:_id', validateMovieId, deleteMovie);

module.exports = routesMovies;
