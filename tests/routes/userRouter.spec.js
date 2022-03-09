const userRouter = require('../../src/routes/userRouter');
const authController = require('../../src/controllers/authController');
const userController = require('../../src/controllers/userController');

jest.mock('express', () => ({
  Router: () => ({
    delete: jest.fn(),
    post: jest.fn(),
    patch: jest.fn(),
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

  it('should call resetPassword', () => {
    expect(userRouter.patch).toHaveBeenCalledWith(
      '/resetPassword/:token',
      authController.resetPassword
    );
  });

  it('should call updatePassword', () => {
    expect(userRouter.post).toHaveBeenCalledWith(
      '/updatePassword',
      authController.protect,
      authController.updatePassword
    );
  });

  it('should call updateMe', () => {
    expect(userRouter.patch).toHaveBeenCalledWith(
      '/updateMe',
      authController.protect,
      userController.updateMe
    );
  });

  it('should call deleteMe', () => {
    expect(userRouter.delete).toHaveBeenCalledWith(
      '/deleteMe',
      authController.protect,
      userController.deleteMe
    );
  });
});
