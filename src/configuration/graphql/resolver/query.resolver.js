const { login } = require('../../../core/login/services/login.service');

module.exports = {
  message: () => 'Hello World!',
  login,
};
