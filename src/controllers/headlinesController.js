const News = require('../models/newsModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');

exports.getHeadlines = catchAsync(async (req, res) => {
  const features = new APIFeatures(News.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .limitRecords();

  const headlines = await features.query;

  res.status(200).json({
    status: 'success',
    results: headlines.length,
    data: {
      headlines,
    },
  });
});
