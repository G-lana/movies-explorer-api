const routesUsers = require('express').Router();
const { updateUserInfo } = require('../middlewares/validation');
const {
  getCurrentUser,
  updateProfile,
  logout,
} = require('../controllers/users');

routesUsers.get('/me', getCurrentUser);
routesUsers.patch('/me', updateUserInfo, updateProfile);
routesUsers.post('/logout', logout);

module.exports = routesUsers;
