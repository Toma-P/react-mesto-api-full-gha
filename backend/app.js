require('dotenv').config();
const express = require('express');

const app = express();
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const rateLimits = require('express-rate-limit');
const cors = require('cors');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const error = require('./middlewares/error');
const { userInfoValidation, authInfoValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT, DB_URL } = process.env;

app.use(express.json());
app.use(cors());
app.use(helmet());
mongoose.connect(DB_URL);

app.use(rateLimits({ windowMS: 60000, max: 100, message: 'Превышен лимит запросов' }));

app.use(requestLogger);
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
