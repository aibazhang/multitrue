/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const News = require('../../src/models/newsModel');

// テストデータ
const news = [
  {
    country: 'us',
    category: 'general',
    title: 'title1',
    description: 'description!!',
    url: 'news.com',
    publishedAt: Date.now(),
  },
  {
    country: 'jp',
    category: 'general',
    title: '日本語',
    description: '日本語詳細',
    url: 'news.com',
    publishedAt: Date.now(),
  },
];

describe('src/models/newsModel', () => {
  beforeAll(async () => {
    mongoose.Promise = global.Promise;
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
  });

  beforeEach(async () => {
    await News.deleteMany({});
    await News.collection.insertMany(news);
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  describe('Query Helper', () => {
    describe('findOrCreate', () => {
      test('get news by specific country and title', async () => {
        const result = await News.findOne({ country: 'us', title: 'title1' });
        console.log(result);
        expect(result?.title).toEqual('title1');
      });
    });
  });
});
