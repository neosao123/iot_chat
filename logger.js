// logger.js

const winston = require('winston');
const path = require('path');

const logger = (serialNumber) => {
  const logFilePath = path.join(__dirname, 'logs', serialNumber, 'app.log');
  const { combine, timestamp, json, prettyPrint } = winston.format;

  return winston.createLogger({
    level: 'info',
    // format: winston.format.combine(
    //   winston.format.timestamp(),
    //   // Custom formatter to stringify objects
    //   winston.format.printf(({ level, message, timestamp }) => {
    //     if (typeof message === 'object') {
    //       // If message is an object, stringify it
    //       message = JSON.stringify(message, null, 2);
    //     }
    //     return `${timestamp} ${level}: ${message}`;
    //   })
    // ),
    format: combine(
      timestamp(),
      json(),
      json(),
      // prettyPrint()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: logFilePath })
    ]
  });
};

module.exports = logger;
