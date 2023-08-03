const express = require('express');
require('dotenv').config();

const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimits = require('express-rate-limit');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { userInfoValidation, authInfoValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
// const allowedCors = [
//  'https://api.tomiko.students.nomoreparties.co',
//  'https://tomiko.students.nomoreparties.co',
//  'http://localhost:3001',
// ];

app.use(express.json());
app.use(helmet());
mongoose.connect(DB_URL);

app.use((req, res, next) => {
  // const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  // if (allowedCors.includes(origin)) {
  //  res.header('Access-Control-Allow-Origin', origin);
  // }
  res.header('Access-Control-Allow-Origin', '*');
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  next();
});
app.use(requestLogger);
app.use(rateLimits({ windowMS: 60000, max: 100, message: 'Превышен лимит запросов' }));
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.post('/signup', userInfoValidation, createUser);
app.post('/signin', authInfoValidation, login);

app.use(auth);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT);
