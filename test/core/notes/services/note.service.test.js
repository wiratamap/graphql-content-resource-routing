const nock = require('nock');
const { expect } = require('chai');
const { fetchNotes, createNote } = require('../../../../src/core/notes/services/note.service');

describe('note.service', () => {
  const context = {
    headers: {
      authorization: 'Bearer my-token',
    },
  };

  const successResult = [{ title: 'this is title', content: 'this is content' }];
  const createdNote = { title: 'this is title', content: 'this is content' };

  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchAllNotes', () => {
    it('should return notes when successfully retrieve data from the endpoint', async () => {
      nock('http://localhost:3000', {
        reqheaders: {
          Authorization: context.headers.authorization,
        },
      }).get('/notes').reply(200, successResult);


      const notes = await fetchNotes(null, context);
      expect(notes).to.eql(successResult);
    });

    it('should throw error when something went wrong', async () => {
      const response = { status: 401, statusText: 'Unauthorized' };

      nock('http://localhost:3000', {
        reqheaders: {
          Authorization: context.headers.authorization,
        },
      }).get('/notes').reply(401, response);

      try {
        await fetchNotes(null, context);
      } catch (error) {
        expect(error.message).to.eql(response.statusText);
      }
    });
  });

  describe('createNote', () => {
    it('should return created note when successfully create the note', async () => {
      const args = { newNote: { title: 'my new note', content: 'this is the content' } };
      nock('http://localhost:3000', {
        reqheaders: {
          authorization: context.headers.authorization,
        },
      }).post('/notes', args.newNote).reply(200, createdNote);

      const result = await createNote(args, context);

      expect(result).to.eql(createdNote);
    });

    it('should throw error when something went wrong', async () => {
      const args = { newNote: { title: 'my new note', content: 'this is the content' } };
      const response = { status: 500, statusText: 'Internal Server Error' };

      nock('http://localhost:3000', {
        reqheaders: {
          authorization: context.headers.authorization,
        },
      }).post('/notes', args.newNote).reply(500, response);

      try {
        await createNote(args, context);
      } catch (error) {
        expect(error.message).to.equal(response.statusText);
      }
    });
  });
});
