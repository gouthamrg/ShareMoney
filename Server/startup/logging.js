const winston = require('winston');
require('winston-mongodb');

module.exports = function () {

  const logFile = new winston.transports.File(
    {
      filename: 'logfile.log',
      level: 'info'
    }
  );

  const errorFile = new winston.transports.File({
    filename: 'error.log',
    level: 'error'
  });

  const myconsole = new winston.transports.Console();

  winston.add(myconsole);
  winston.add(logFile);
  winston.add(errorFile);
  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/ShareMoney',
    level: 'error'
  }));

  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
}