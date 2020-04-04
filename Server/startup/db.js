const mongoose = require('mongoose');
const config = require('config');

module.exports = function () {
  mongoose.connect(config.get("mongoDbUrl"),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    .then(() => { console.log('Connected to db'); })
    .catch(() => { console.log('Error'); });
}