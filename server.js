/* eslint-disable no-console */
/* eslint-disable comma-dangle */
const http = require('http');
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
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
  if (importDataJob.running() && process.env.NODE_ENV === 'production') {
    console.log(
      `Import data job running... Next run on ${importDataJob.next()}`
    );
  }

  // Wake up Heroku
  if (process.env.NODE_ENV === 'production') {
    setInterval(() => {
      http.get('https://multitrue.herokuapp.com/');
    }, 15 * 60 * 1000);
  }
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥💥 process terminated!');
  });
});
