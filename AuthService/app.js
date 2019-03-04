//Import required modules
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const moment = require("moment");

const dotenv = require("dotenv");
dotenv.config();
const config = require("./config/config");
const serviceRegistry = require("./config/serviceregistry");
const authController = require("./controller/authController");

logger = require("./shared/services/logger");

//Apply middleware to Express
app.use(
  bodyParser.json({
    limit: 5242880
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors());
app.use(helmet());

app.use((req, res, next) => {
  //Set request id to logger options
  logger.transports.dailyRotateFile.options.requestId = req.body.requestId;

  logger.info("Request started.");
  res.on("finish", () => {
    logger.info("Request completed.");
  });
  next();
});

app.use("/auth/getToken", authController.getToken);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
});

app.use((error, req, res, next) => {
  delete error.stack;
  const statusCode = error.status || 500;
  res.status(statusCode).json({
    code: statusCode,
    message: error.message
  });
});

//Handle exception and send an email to admin to alert
process.on("uncaughtException", function(error) {
  const exception_msg = error.message;
  const exception_stack = error.stack;
  logger.error("System Error:", error);
  const data = {
    err_msg: exception_msg,
    err_stack: exception_stack,
    isAdmin: 1
  };
  //mailer.sendEmail(data);
});

//Create HTTP server
const server = http.createServer(app);
//Start listening request on port
server.listen(config.server.port, function(error) {
  logger.info(
    "Started AuthService on " +
      config.server.port +
      " at " +
      moment().format("DD-MM-YYYY hh:mm:ss:SSS A")
  );
});
