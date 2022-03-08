/* eslint-disable no-underscore-dangle */
const { mockReq, mockRes } = require('sinon-express-mock');
const authController = require('../../src/controllers/authController');

jest.mock('../../src/models/userModel', () => ({
  create: jest.fn((user) => {
    const _id = '12345';
    return Promise.resolve({ _id, ...user });
  }),
  findOne: jest.fn().mockReturnThis(),
  select: jest.fn().mockResolvedValue(
    Promise.resolve({
      _id: '12345',
      email: 'example@email.com',
      password: 'pass1234',
      correctPassword: () => true,
    })
  ),
}));

describe('../../src/controllers/authController', () => {
  beforeAll(() => {
    jest.resetModules();
    process.env = {
      JWT_SECRET: 'secret-token',
      JWT_EXPIRES_IN: '180d',
      JWT_COOKIE_EXPIRE_IN: 90,
    };
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('signup', () => {
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

  /*
  describe('login', () => {
    it('should login', async () => {
      const user = {
        email: 'example@email.com',
        password: 'pass1234',
      };

      const request = {
        body: user,
      };

      const req = mockReq(request);
      const res = mockRes();

      // await authController.login(req, res);
      // expect(res.status.calledWith(201)).toBeTruthy();

      await expect(authController.login(req, res)).rejects.toThrow(/sssssss/);
      // const { token } = res.json.getCall(0).args[0];
      // expect(token).toBeTruthy();
    });
  });
  it('should not login without password', async () => {
    const user = {
      email: 'example@email.com',
    };

    const request = {
      body: user,
    };

    const req = mockReq(request);
    const res = mockRes();

    await expect(authController.login(req, res)).rejects.toThrow(
      /Please provide email and password!/
    );
  });
  it('should not login without email', async () => {
    const user = {
      email: 'example@email.com',
      password: 'pass1234',
    };

    const request = {
      body: user,
    };

    const req = mockReq(request);
    const res = mockRes();

    await expect(authController.login(req, res)).rejects.toThrow(
      /Please provide email and password!/
    );
  });
  it('should not login with incorrect password', async () => {
    UserMock.correctPassword.mockReturnValueOnce(false);
    const user = {
      email: 'example@email.com',
      password: 'pass1234',
    };

    const request = {
      body: user,
    };

    const req = mockReq(request);
    const res = mockRes();

    await expect(authController.login(req, res)).rejects.toThrow(
      /Incorrect email or password!/
    );
  });
  */
});
