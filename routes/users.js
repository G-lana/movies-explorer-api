const routesUsers = require('express').Router();
const { updateUserInfo } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateProfile,
} = require('../controllers/users');

routesUsers.get('/me', getCurrentUser);
routesUsers.patch('/me', updateUserInfo, updateProfile);

module.exports = routesUsers;
