const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
const mongoose = require('mongoose');
const News = require('../src/models/newsModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    socketTimeoutMS: 45000,
  })
  .then(() => console.log('DB connection successful!'));

const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);

async function saveDataToDB(cat, cou) {
  try {
    const { articles } = await newsapi.v2.topHeadlines({
      category: cat,
      country: cou,
    });
    const news = articles.map((a) => ({ country: cou, category: cat, ...a }));
    await News.insertMany(news, { ordered: false });
    console.log('Data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
}

saveDataToDB('business', 'us');
