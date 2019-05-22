const fetch = require('node-fetch');
const CONSTANT = require('../../../common/constant');
const logger = require('../../../configuration/logger');

const postRequest = async (body) => {
  const endpoint = CONSTANT.LOGIN_URL;

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
};


const login = async (args) => {
  const { loginRequest } = { ...args };

  try {
    const loginResult = await postRequest(loginRequest);

    return loginResult.json();
  } catch (error) {
    logger.error(error.message);
    return error;
  }
};

module.exports = {
  login,
};
