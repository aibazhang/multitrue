/* eslint-disable no-underscore-dangle */
const { mockReq, mockRes } = require('sinon-express-mock');
const newsController = require('../../src/controllers/newsController');

jest.mock('../../src/models/newsModel', () => ({
  create: jest.fn((news) => {
    const _id = '12345';
    return Promise.resolve({ _id, ...news });
  }),
  findById: jest.fn((id) => {
    Promise.resolve({ id });
  }),
}));

describe('../../src/controller/newsController', () => {
  it('should create', async () => {
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

  it('should get', async () => {
    const request = {
      params: {
        id: '1',
      },
    };

    const req = mockReq(request);
    const res = mockRes();

    await newsController.getNews(req, res);
    expect(res.status.calledWith(200)).toBeTruthy();
  });
});
