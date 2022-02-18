const newsRouter = require('../../src/routes/newsRouter');
const newsController = require('../../src/controllers/newsController');

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
    post: jest.fn(),
  }),
}));

jest.mock('../../src/controllers/newsController');

describe('../../src/routes/newsRouter', () => {
  test('when get /api/v1/news, getNews action will be called', () => {
    expect(newsRouter.get).toHaveBeenCalledWith('/:id', newsController.getNews);
  });

  test('when post /api/v1/news, createNews action will be called', () => {
    expect(newsRouter.post).toHaveBeenCalledWith(
      '/',
      newsController.createNews
    );
  });
});
