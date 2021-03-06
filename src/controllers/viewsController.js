const News = require('../models/newsModel');
const catchAsync = require('../utils/catchAsync');
const countWordsFrequency = require('../utils/countWordsFrequency');
const viewConfig = require('../../view-config.json');

const calcWordFrequncyInArticles = (obj) => {
  // Calculate frequency of words in title and description
  const titleTerms = obj.map((el) => el.title.split(' -')[0]);
  const descTerms = obj
    .filter((el) => el.description)
    .map((el) => el.description);
  return countWordsFrequency([...titleTerms, ...descTerms].join(' ')).filter(
    (el) => el.value >= viewConfig.wordscloud.minFrequency
  );
};

exports.getHeadlinesUS = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'us' })
    .sort('-publishedAt')
    .limit(viewConfig.limit);

  const articlesTitleDesc = await News.find({
    category: 'general',
    country: 'us',
    publishedAt: {
      $gt:
        Date.now() - viewConfig.wordscloud.dateRangeDay * 24 * 60 * 60 * 1000,
    },
  }).select('title description');
  const wordsFrequency = calcWordFrequncyInArticles(articlesTitleDesc);
  res.status(200).render('index', {
    countryMeta: {
      flag: 'πΊπΈ',
      title: 'Top Stories',
      code: 'us',
    },
    news,
    wordsFrequency,
  });
});

exports.getHeadlinesJP = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'jp' })
    .sort('-publishedAt')
    .limit(viewConfig.limit);

  res.status(200).render('index', {
    countryMeta: {
      flag: 'π―π΅',
      title: 'γγγγγ₯γΌγΉ',
      code: 'jp',
    },
    news,
  });
});

exports.getHeadlinesTW = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'tw' })
    .sort('-publishedAt')
    .limit(viewConfig.limit);

  res.status(200).render('index', {
    countryMeta: {
      flag: 'πΉπΌ',
      title: 'η±ιζ°θ',
      code: 'tw',
    },
    news,
  });
});

exports.getHeadlinesCN = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'cn' })
    .sort('-publishedAt')
    .limit(viewConfig.limit);

  res.status(200).render('index', {
    countryMeta: {
      flag: 'π¨π³',
      title: 'η­ι¨ζ°ι»',
      code: 'cn',
    },
    news,
  });
});

exports.getHeadlinesKR = catchAsync(async (req, res) => {
  const news = await News.find({ category: 'general', country: 'kr' })
    .sort('-publishedAt')
    .limit(viewConfig.limit);

  res.status(200).render('index', {
    countryMeta: {
      flag: 'π°π·',
      title: 'μ£Όμ λ΄μ€',
      code: 'kr',
    },
    news,
  });
});
