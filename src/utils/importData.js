const dotenv = require('dotenv');
const NewsAPI = require('newsapi');
const Cron = require('croner');
const dataImportConfig = require('../../dataImportConfig.json');
const News = require('../models/newsModel');

dotenv.config({ path: './config.env' });

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

const job = Cron(
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

module.exports = job;
