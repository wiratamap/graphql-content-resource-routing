const nock = require('nock');
const { expect } = require('chai');
const { fetchNotes } = require('../../../../src/core/notes/services/note.service');

describe('note.service', () => {
  const context = {
    headers: {
      Authorization: 'Bearer my-token',
    },
  };

  const successResult = [{ title: 'this is title', content: 'this is content' }];

  afterEach(() => {
    nock.cleanAll();
  });

  describe('fetchAllNotes', () => {
    it('should return notes when successfully retrieve data from the endpoint', async () => {
      nock('http://localhost:3000', {
        reqheders: {
          Authorization: context.headers.Authorization,
        },
      }).get('/notes').reply(200, successResult);


      const notes = await fetchNotes(null, context);
      expect(notes).to.eql(successResult);
    });

    it('should throw error when something went wrong', async () => {
      const response = { status: 401, statusText: 'Unauthorized' };

      nock('http://localhost:3000', {
        reqheders: {
          Authorization: context.headers.Authorization,
        },
      }).get('/notes').reply(401, response);

      try {
        await fetchNotes(null, context);
      } catch (error) {
        expect(error.message).to.eql(response.statusText);
      }
    });
  });
});
