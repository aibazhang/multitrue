const viewRouter = require('../../src/routes/viewRouter');
const viewsController = require('../../src/controllers/viewsController');

jest.mock('express', () => ({
  Router: () => ({
    get: jest.fn(),
  }),
}));

jest.mock('../../src/controllers/viewsController');

describe('../../src/routes/viewRouter', () => {
  it('should call get US news', () => {
    expect(viewRouter.get).toHaveBeenCalledWith(
      '/',
      viewsController.getHeadlinesUS
    );
  });

  it('should call get JP news', () => {
    expect(viewRouter.get).toHaveBeenCalledWith(
      '/jp',
      viewsController.getHeadlinesJP
    );
  });

  it('should call get TW news', () => {
    expect(viewRouter.get).toHaveBeenCalledWith(
      '/tw',
      viewsController.getHeadlinesTW
    );
  });

  it('should call get CN news', () => {
    expect(viewRouter.get).toHaveBeenCalledWith(
      '/cn',
      viewsController.getHeadlinesCN
    );
  });

  it('should call get KR news', () => {
    expect(viewRouter.get).toHaveBeenCalledWith(
      '/kr',
      viewsController.getHeadlinesKR
    );
  });
});
