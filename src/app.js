const express = require('express');
const morgan = require('morgan');
const headlinesRouter = require('./routes/headlinesRouter');

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/headlines', headlinesRouter);

module.exports = app;
