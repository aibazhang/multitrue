const headlinesRouter = require('../../src/routes/headlinesRouter');
const headlinesController = require('../../src/controllers/headlinesController');
const authController = require('../../src/controllers/authController');

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
  }),
}));

jest.mock('../../src/controllers/headlinesController');

describe('../../src/routes/headlinesRouter', () => {
  test('when get /api/v1/headlines, getHeadlines action will be called', () => {
    expect(headlinesRouter.get).toHaveBeenCalledWith(
      '/',
      authController.protect,
      headlinesController.getHeadlines
    );
  });
});
