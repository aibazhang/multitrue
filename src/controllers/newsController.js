const News = require('../models/newsModel');

exports.getNews = async (req, res) => {
  try {
    const headline = await News.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: {
        headline,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createNews = async (req, res) => {
  try {
    const newNews = await News.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        newNews,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
