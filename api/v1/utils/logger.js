const {createLogger, format, transports} = require('winston');
require('winston-daily-rotate-file');
const fs = require('fs');
const path = require('path');

// const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const dailyRotateFileTransport = new transports.DailyRotateFile({
  level: 'info',
  filename: `${logDir}/%DATE%-results.log`,
  datePattern: 'YYYY-MM-DD',
});

const filename = path.join(logDir, 'results.log');

const logger = caller => {
  return createLogger({
    level: 'silly',
    format: format.combine(
      format.label({label: path.basename(caller)}),
      format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      format.printf(
        info =>
          ` ${info.timestamp} ${info.level} [${info.label}] :  ${
            info.message
          } `,
      ),
    ),
    transports: [
      new transports.Console({
        format: format.combine(
          format.colorize(),
          format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
          format.printf(
            info =>
              ` ${info.timestamp} ${info.level} [${info.label}] : ${
                info.message
              }`,
          ),
        ),
      }),
      new transports.File({
        level: 'warn',
        filename,
        format: format.combine(
          format.printf(
            info =>
              ` ${info.timestamp} ${info.level} [${info.label}] : ${
                info.message
              } `,
          ),
        ),
      }),
      dailyRotateFileTransport,
    ],
  });
};

module.exports = logger;
