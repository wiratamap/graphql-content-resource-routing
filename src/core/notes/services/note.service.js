const fetch = require('node-fetch');
const CONSTANT = require('../../../common/constant');

const getRequest = async (authorization) => {
  const endpoint = CONSTANT.NOTES_URL;

  return fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: authorization,
    },
  });
};


const fetchNotes = async (args, context) => {
  const { authorization } = { ...context.headers };

  const result = await getRequest(authorization);

  if (result.status !== 200) throw new Error(result.statusText);

  return result.json();
};

module.exports = {
  fetchNotes,
};
