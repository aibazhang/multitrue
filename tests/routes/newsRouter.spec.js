const newsRouter = require('../../src/routes/newsRouter');
const newsController = require('../../src/controllers/newsController');
const authController = require('../../src/controllers/authController');

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
}));

jest.mock('../../src/controllers/newsController');

describe('../../src/routes/newsRouter', () => {
  it('should call getNews action', () => {
    expect(newsRouter.get).toHaveBeenCalledWith(
      '/:id',
      authController.protect,
      newsController.getNews
    );
  });

  it('should call createNews action', () => {
    expect(newsRouter.post).toHaveBeenCalledWith(
      '/',
      authController.protect,
      newsController.createNews
    );
  });
});
