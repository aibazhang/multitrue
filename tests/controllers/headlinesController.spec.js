const { mockReq, mockRes } = require('sinon-express-mock');
const headlinesController = require('../../src/controllers/headlinesController');

jest.mock('../../src/utils/apiFeatures', (queryString) => {
  const mockAPIFeatures = {
    filter: jest.fn().mockReturnThis(),
    sort: jest.fn().mockReturnThis(),
    limitFields: jest.fn().mockReturnThis(),
    limitRecords: jest.fn().mockReturnThis(),
    query: jest.fn(() => {
      Promise.resolve([{ title: 'new1' }, { title: 'new2' }]);
    }),
    queryString,
  };
  return jest.fn().mockImplementation(() => mockAPIFeatures);
});

jest.mock('../../src/models/newsModel', () => ({
  find: jest.fn().mockReturnThis(),
}));

describe('../../src/controller/headlinesController', () => {
  it('should get', async () => {
    const request = {
      query:
        'country=us&category=business&fields=title,author,publishedAt,category&limit=10',
    };

    const req = mockReq(request);
    const res = mockRes();

    await headlinesController.getHeadlines(req, res);
    expect(res.status.calledWith(200)).toBeTruthy();
  });
});
