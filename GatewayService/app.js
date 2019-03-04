//Import required modules
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const moment = require("moment");
const _uuid = require("uuid");

const dotenv = require("dotenv");
dotenv.config();
const config = require("./config/config");
const serviceRegistry = require("./config/serviceregistry");

const util = require("./shared/services/util");
const request = require("./shared/services/request");

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

//Log request start and end
app.use((req, res, next) => {
  req.body.requestId = _uuid.v4(); //Generate unique request id - it will be send to call other services
  logger.info("Request: " + req.body.requestId + " started.");
  res.on("finish", () => {
    logger.info("Request: " + req.body.requestId + " completed.");
  });
  next();
});

//special request to get JWT token by passing user/password
//this token is required to call subsequential services
app.use("/auth/getToken", (req, res, next) => {
  const endpoint = serviceRegistry.repository.authService;
  logger.info(
    "Request: " +
      req.body.requestId +
      " - " +
      req.originalUrl +
      " forwarded to " +
      endpoint
  );

  request
    .request(endpoint, req)
    .then(response => {
      res.status(response.status).json(response.data);
    })
    .catch(error => {
      res.status(503).json({ status: "503", message: "Service unavailable" });
    });
});

//Handle all other requests
app.use("*", util.verifyAuthentication, (req, res, next) => {
  //get service name from URL
  const service = util.parseServiceFromURL(req.originalUrl);
  //get endpoint from service registry
  if (serviceRegistry.repository.hasOwnProperty(service)) {
    const endpoint = serviceRegistry.repository[service];

    logger.info(
      "Request: " +
        req.body.requestId +
        " - " +
        req.originalUrl +
        " forwarded to " +
        endpoint
    );
    request
      .request(endpoint, req)
      .then(response => {
        res.status(response.status).json(response.data);
      })
      .catch(error => {
        if (error.response) {
          res.status(error.response.status).json(error.response.data);
        } else {
          res.status(503).json("Service unavailable");
        }
      });
  } else {
    const error = new Error("Not Found");
    error.status = 400;
    next(error);
  }
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
    "Started GatewayService on " +
      config.server.port +
      " at " +
      moment().format("DD-MM-YYYY hh:mm:ss:SSS A")
  );
});

module.exports = app;
