/* eslint-disable no-underscore-dangle */
const { mockReq, mockRes } = require('sinon-express-mock');
// const News = require('../../src/models/newsModel');
const newsController = require('../../src/controllers/newsController');

jest.mock('../../src/models/newsModel', () => ({
  create: jest.fn((news) => {
    const _id = '12345';
    return Promise.resolve({ _id, ...news });
  }),
}));

describe('../../src/controller/newsController', () => {
  test('create', async () => {
    const testNews = {
      country: 'us',
      category: 'general',
      title: 'title1',
      description: 'description!!',
      url: 'news.com',
      publishedAt: Date.now(),
    };

    const request = {
      body: testNews,
    };

    const req = mockReq(request);
    const res = mockRes();

    await newsController.createNews(req, res);

    expect(res.status.calledWith(201)).toBeTruthy();

    const news = res.json.getCall(0).args[0].data.newNews;
    delete news._id;
    expect(news).toEqual(testNews);
  });
});
