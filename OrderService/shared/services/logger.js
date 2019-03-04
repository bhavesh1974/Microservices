const path = require("path");
const fs = require("fs");
const winston = require("winston");
const moment = require("moment");
require("winston-daily-rotate-file");

var datetime = function() {
  return moment().format("DD-MM-YYYY hh:mm:ss:SSS A");
};

var logDirectory = path.join(__dirname, "../../logs");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

var logFormatter = function(options) {
  requestId = options.requestId ? "[" + options.requestId + "]" : "";
  return (
    requestId +
    "[" +
    datetime() +
    "] - [" +
    options.level.toUpperCase() +
    "]" +
    " - " +
    (options.message ? options.message : "") +
    (options.meta && Object.keys(options.meta).length
      ? "\t" + JSON.stringify(options.meta)
      : "")
  );
};

var transport1 = new winston.transports.DailyRotateFile({
  filename: "%DATE%.log",
  timestamp: datetime,
  formatter: logFormatter,
  dirname: logDirectory,
  prepend: true,
  level: process.env.ENV === "development" ? "debug" : "info",
  json: false,
  localTime: true,
  zippedArchive: true
});

var transport2 = new winston.transports.Console({
  colorize: true,
  timestamp: datetime,
  formatter: logFormatter,
  localTime: true,
  level: process.env.ENV === "development" ? "debug" : "info"
});

var logger = new winston.Logger({
  transports: [transport1, transport2]
});

module.exports = logger;
