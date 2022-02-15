const News = require('../models/newsModel');
const APIFeatures = require('../utils/apiFeatures');

exports.getHeadlines = async (req, res) => {
  try {
    const features = new APIFeatures(News.find(), req.query)
      .filter()
      .sort()
      .limitFields();

    const headlines = await features.query;

    res.status(200).json({
      status: 'success',
      results: headlines.length,
      data: {
        headlines,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
