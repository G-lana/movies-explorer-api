/* eslint-disable linebreak-style */
const routesUsers = require('express').Router();
const { validateUpdateProfile } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

routesUsers.get('/me', getCurrentUser);
routesUsers.patch('/me', validateUpdateProfile, updateProfile);

module.exports = routesUsers;
