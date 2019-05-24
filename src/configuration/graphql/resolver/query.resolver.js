const { login } = require('../../../core/login/services/login.service');
const { fetchNotes, createNote } = require('../../../core/notes/services/note.service');

module.exports = {
  message: () => 'Hello World!',
  login,
  fetchNotes,
  createNote,
};
