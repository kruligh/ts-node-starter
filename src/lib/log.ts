import * as winston from "winston";

export const loggerOptions = {
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.json(),
  ),
  expressFormat: false,
  colorize: true,
  ignoreRoute: (req, res) => {
    return false;
  },
};

export const expressLoggerOptions = {
  ...loggerOptions,
  meta: true,
};

export const log = winston.createLogger(loggerOptions);

export const logStackTrace = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
  ),
});
