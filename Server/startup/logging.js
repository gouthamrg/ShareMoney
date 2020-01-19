const winston = require('winston');

module.exports = function () {

  const logFile = new winston.transports.File(
    {
      filename: 'logfile.log',
      level: 'info'
    }
  );

  const errorFile = new winston.transports.File({
    filename: 'error1.log',
    level: 'error'
  });

  const myconsole = new winston.transports.Console();

  winston.add(myconsole);
  winston.add(logFile);
  winston.add(errorFile);
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
}