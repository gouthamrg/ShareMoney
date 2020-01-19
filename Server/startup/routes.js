const express = require('express');
const cors = require('cors');
const users = require('../routes/users');
const auth = require('../routes/auth');
const transactions = require('../routes/transaction');
const error = require('../middlewares/error');
// const logger = require('../middlewares/logger');
//ToDo: error middleware

module.exports = function (app) {
  app.use(express.json());
  app.use(cors());
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/transactions', transactions);
  app.use(error);
}