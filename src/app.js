const path = require('path');
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSantitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const headlinesRouter = require('./routes/headlinesRouter');
const newsRouter = require('./routes/newsRouter');
const userRouter = require('./routes/userRouter');
const viewRouter = require('./routes/viewRouter');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serving staic files
app.use(express.static(path.join(__dirname, '..', 'public')));

// Set security HTTP haeders
app.use(helmet());

// Development login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour',
});

app.use('/api', limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSantitize());

// Data sanitization against XSS
app.use(xss());

// Bod parser, reading data from body in req.body
app.use(express.json({ limit: '10kb' }));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Mount Routes
app.get(['/', '/jp', '/tw', '/cn'], viewRouter);
app.use('/api/v1/headlines', headlinesRouter);
app.use('/api/v1/news', newsRouter);
app.use('/api/v1/user', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
