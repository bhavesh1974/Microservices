//Import required modules
const http = require("http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const moment = require("moment");
const mongoose = require("mongoose");

const dotenv = require("dotenv");
dotenv.config();
const config = require("./config/config");
const memberController = require("./controller/memberController");

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
  logger.info("Request: " + req.body.requestId + " started.");
  res.on("finish", () => {
    logger.info("Request: " + req.body.requestId + " completed.");
  });
  next();
});

//Route API to controller
app.get("/members/:id", memberController.getMember);
app.get("/members", memberController.getMembers);
app.post("/members", memberController.insert);
app.put("/members/:id", memberController.update);
app.delete("/members/:id", memberController.delete);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 400;
  res.status(statusCode).json({
    code: statusCode,
    message: error.message
  });
});

app.use((error, req, res, next) => {
  logger.error("System Error:", error);
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

//Connect to database before starting server
mongoose.Promise = global.Promise;
mongoose
  .connect("mongodb://" + config.mongo.host + "/" + config.mongo.database)
  .then(success => {
    //Create HTTP server
    const server = http.createServer(app);
    //Start listening request on port
    server.listen(config.server.port, function(error) {
      logger.info(
        "Started MemberService on " +
          config.server.port +
          " at " +
          moment().format("DD-MM-YYYY hh:mm:ss:SSS A")
      );
    });
  })
  .catch(error => {
    console.log(error);
  });
