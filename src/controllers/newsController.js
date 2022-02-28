const News = require('../models/newsModel');
const catchAsync = require('../utils/catchAsync');

exports.getNews = catchAsync(async (req, res) => {
  const headline = await News.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      headline,
    },
  });
});

exports.createNews = catchAsync(async (req, res) => {
  const newNews = await News.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      newNews,
    },
  });
});
