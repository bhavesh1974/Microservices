const jwt = require("jsonwebtoken");
const config = require("../../config/config");

module.exports = {
  parseServiceFromURL: url => {
    //parse service name from URL
    let service = url.substring(1);
    const subPathSeperator = service.indexOf("/");
    if (subPathSeperator > 0) {
      service = service.substring(0, subPathSeperator);
    }
    service = service + "Service";
    return service;
  },
  verifyAuthentication: (req, res, next) => {
    let error = new Error("Not authenticated.");
    error.status = 401;

    const authHeader = req.get("Authorization");
    if (!authHeader) {
      throw error;
    }

    if (authHeader.split(" ").size <= 1) {
      throw error;
    }

    const token = authHeader.split(" ")[1];
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, config.JWT.JWT_ENCRYPTION);
    } catch (err) {
      err.status = 500;
      throw err;
    }
    if (!decodedToken) {
      throw error;
    }
    if (!decodedToken.userName || !decodedToken.generatedBy) {
      throw error;
    }
    if (
      decodedToken.userName != "bhavesh" ||
      decodedToken.generatedBy != "AuthService"
    ) {
      throw error;
    }

    next();
  }
};
