/* eslint-disable no-underscore-dangle */
const { mockReq, mockRes } = require('sinon-express-mock');
const authController = require('../../src/controllers/authController');

jest.mock('../../src/models/userModel', () => ({
  create: jest.fn((user) => {
    const _id = '12345';
    return Promise.resolve({ _id, ...user });
  }),
}));

describe('../../src/controllers/authController', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      JWT_SECRET: 'secret-token',
      JWT_EXPIRES_IN: '180d',
      JWT_COOKIE_EXPIRE_IN: 90,
    };
  });

  it('should signup', async () => {
    const user = {
      email: 'example@email.com',
      name: 'name',
      password: 'pass1234',
      passwordConfirm: 'pass1234',
      role: 'admin',
    };

    const request = {
      body: user,
    };

    const req = mockReq(request);
    const res = mockRes();

    await authController.signup(req, res);

    expect(res.status.calledWith(201)).toBeTruthy();

    const { token } = res.json.getCall(0).args[0];
    expect(token).toBeTruthy();
  });
});
