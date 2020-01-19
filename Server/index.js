require('express-async-errors');
const express = require('express');
const app = express();
const winston = require('winston');

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/logging')();
require('./startup/validation')();
require('./startup/config')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Share Money Application listening on port ${port}!`));