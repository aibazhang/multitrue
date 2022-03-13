const News = require('../models/newsModel');
const catchAsync = require('../utils/catchAsync');

exports.getHeadlinesUS = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'us' })
    .sort('-publishedAt')
    .limit(10);

  res.status(200).render('index', {
    countryMeta: {
      flag: '🇺🇸',
      title: 'Top Stories',
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
      title: 'トップニュース',
      code: 'jp',
    },
    news,
  });
});

exports.getHeadlinesTW = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'tw' })
    .sort('-publishedAt')
    .limit(10);

  res.status(200).render('index', {
    countryMeta: {
      flag: '🇹🇼',
      title: '熱門新聞',
      code: 'tw',
    },
    news,
  });
});

exports.getHeadlinesCN = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'cn' })
    .sort('-publishedAt')
    .limit(10);

  res.status(200).render('index', {
    countryMeta: {
      flag: '🇨🇳',
      title: '热门新闻',
      code: 'cn',
    },
    news,
  });
});
