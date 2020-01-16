const winston = require('winston');

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.errors({ stack: true })
  ),
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
    //ToDo: Error is not logging, Only Exceptions does
    // new winston.transports.File({ filename: 'error.log', level: 'error' })
  ],
  exceptionHandlers: [
    new winston.transports.File({ filename: 'exception.log' }),
    // new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

logger.exceptions.handle(
  new winston.transports.File({ filename: 'exception.log' }),
);

module.exports.logger = logger;