const AppError = require('../../src/utils/appError');

describe('../../src/utils/appError', () => {
  it('should deal with 4xx', async () => {
    const error = new AppError('error message', 404);
    expect(error.status).toEqual('fail');
  });
  it('should deal with other', () => {
    const error = new AppError('error message', 500);
    expect(error.status).toEqual('error');
  });
});
