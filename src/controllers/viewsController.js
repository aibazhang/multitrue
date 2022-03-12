const News = require('../models/newsModel');
const catchAsync = require('../utils/catchAsync');

exports.getHeadlinesUS = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'us' })
    .sort('-publishedAt')
    .limit(10);

  res.status(200).render('index', {
    countryMeta: {
      flag: '🇺🇸',
      fullName: 'the US',
      code: 'us',
    },
    news,
  });
});

exports.getHeadlinesJP = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'jp' })
    .sort('-publishedAt')
    .limit(10);

  res.status(200).render('index', {
    countryMeta: {
      flag: '🇯🇵',
      fullName: 'Japan',
      code: 'jp',
    },
    news,
  });
});

// exports.getHeadlines = catchAsync(async (req, res) => {
//   const news = await News.find({ category: 'general', country: 'tw' })
//     .sort('-publishedAt')
//     .limit(10);

//   res.status(200).render('tw', {
//     news,
//   });
// });

// exports.getHeadlines = catchAsync(async (req, res) => {
//   const news = await News.find({ category: 'general', country: 'cn' })
//     .sort('-publishedAt')
//     .limit(10);

//   res.status(200).render('cn', {
//     news,
//   });
// });
