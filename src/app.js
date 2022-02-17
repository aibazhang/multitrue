const express = require('express');
const morgan = require('morgan');
const headlinesRouter = require('./routes/headlinesRouter');
const newsRouter = require('./routes/newsRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/headlines', headlinesRouter);
app.use('/api/v1/news', newsRouter);

module.exports = app;
