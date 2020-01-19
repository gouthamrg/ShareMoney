const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
  mongoose.connect('mongodb://localhost/ShareMoney', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log('Connected to db'); })
    .catch(() => { console.log('Error'); });
}