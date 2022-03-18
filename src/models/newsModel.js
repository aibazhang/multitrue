/* eslint-disable func-names */
const mongoose = require('mongoose');
const viewConfig = require('../../view-config.json');

const sourceSchema = mongoose.Schema({
  id: String,
  name: String,
});

const newsSchema = mongoose.Schema({
  country: {
    type: String,
    require: true,
    maxLength: 2,
  },
  category: {
    type: String,
    require: true,
  },
  source: {
    type: sourceSchema,
  },
  author: String,
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  url: {
    type: String,
    require: true,
  },
  urlToImage: String,
  publishedAt: {
    type: Date,
    require: true,
  },
  content: String,
});

newsSchema.index({ title: 1, category: -1 }, { unique: true });

newsSchema.pre(/^find/, function (next) {
  const filterKeyword = viewConfig.filterKeyword.map((el) => new RegExp(el));
  this.find({ title: { $not: { $in: filterKeyword } } });
  next();
});

const News = mongoose.model('News', newsSchema);
module.exports = News;
