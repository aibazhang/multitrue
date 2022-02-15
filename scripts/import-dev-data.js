const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
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

const news = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/sample-news-api.json`, 'utf-8')
);

const createDB = async () => {
  try {
    await News.create();
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const importData = async () => {
  try {
    await News.insertMany(news, { ordered: false });
    console.log('Data successfully loaded!');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await News.deleteMany();
    console.log('Data successfully delete');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--create') {
  createDB();
} else if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
