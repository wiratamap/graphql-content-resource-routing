const { login } = require('../../../core/login/services/login.service');
const { fetchNotes } = require('../../../core/notes/services/note.service');

module.exports = {
  message: () => 'Hello World!',
  login,
  fetchNotes,
};
