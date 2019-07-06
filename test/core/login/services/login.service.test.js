const nock = require('nock');
const { expect } = require('chai');
const { login } = require('../../../../src/core/login/services/login.service');
const constant = require('../../../../src/common/constant');

describe('login.service', () => {
  const successResult = {
    success: true,
    message: 'Authentication success!',
    token: 'user-token',
  };

  afterEach(() => {
    nock.cleanAll();
  });

  describe('login', () => {
    it('should return response when successfully hit the endpoint', async () => {
      const args = {
        loginRequest: {
          email: 'john.doe@example.com',
          password: 'P@ssw0rd',
        },
      };

      nock('http://localhost:3000')
        .post('/login', { email: args.loginRequest.email, password: args.loginRequest.password })
        .reply(200, successResult);

      const loginResult = await login(args);
      expect(loginResult).to.eql(successResult);
    });

    it('should throw error when something went wrong', async () => {
      const errorResult = `request to ${constant.LOGIN_URL} failed, reason: Internal server error`;

      const args = {
        loginRequest: {
          email: 'john.doe@example.com',
          password: 'P@ssw0rd',
        },
      };

      nock('http://localhost:3000')
        .post('/login', { email: args.loginRequest.email, password: args.loginRequest.password })
        .replyWithError('Internal server error');

      const loginResult = await login(args);
      expect(loginResult.message).to.eql(errorResult);
    });
  });
});
