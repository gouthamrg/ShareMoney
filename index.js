require('express-async-errors');
const express = require('express');
const app = express();
const users = require('./routes/users');
const mongoose = require('mongoose');
const config = require('config');
const auth = require('./routes/auth');

if (!config.get('jwtPrivateKey')) {
  throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
}

mongoose.connect('mongodb://localhost/ShareMoney', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to db'); })
  .catch(() => { console.log('Error'); });

app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Share Money Application listening on port ${port}!`));