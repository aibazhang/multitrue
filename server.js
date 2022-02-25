/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./src/app');
const importDataJob = require('./src/utils/importData');

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
  if (importDataJob.running() && process.env.NODE_ENV === 'production') {
    console.log(`Import data job running`);
    console.log(`Next run on ${importDataJob.next()}`);
  } else {
    console.warn('Import data job down');
  }
});
