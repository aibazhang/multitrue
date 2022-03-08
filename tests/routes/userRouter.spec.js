const userRouter = require('../../src/routes/userRouter');
const authController = require('../../src/controllers/authController');

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
}));

jest.mock('../../src/controllers/authController');

describe('../../src/routes/userRouter', () => {
  it('should call signup', () => {
    expect(userRouter.post).toHaveBeenCalledWith(
      '/signup',
      authController.signup
    );
  });

  it('should call login', () => {
    expect(userRouter.post).toHaveBeenCalledWith(
      '/login',
      authController.login
    );
  });

  it('should call forgotPassword', () => {
    expect(userRouter.post).toHaveBeenCalledWith(
      '/forgotPassword',
      authController.forgotPassword
    );
  });
});
