const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
const mongoose = require('mongoose');
const Cron = require('croner');
const News = require('../src/models/newsModel');
const dataImportConfig = require('../dataImportConfig.json');

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
      pageSize: dataImportConfig.limit,
    });
    const news = articles.map((a) => ({ country: cou, category: cat, ...a }));
    await News.insertMany(news, { ordered: false });
  } catch (error) {
    if (error.code === 11000) {
      error.writeErrors.forEach((el) => {
        const dubMessage = el.errmsg.match(/({.*?})/)[0];
        console.log(`dup title x category: ${dubMessage}`);
      });
      console.log(`length ${error.writeErrors.length}`);
    }
  }
}

Cron(
  dataImportConfig.cronPattern,
  {
    maxRuns: Infinity,
    timezone: dataImportConfig.timezone,
  },
  () => {
    dataImportConfig.queries.forEach((el) => {
      saveDataToDB(el.category, el.country);
    });
  }
);
