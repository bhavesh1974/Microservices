const axios = require("axios");

module.exports = {
  request: (endpoint, req) => {
    return axios({
      method: req.method.toLowerCase(),
      url: endpoint + req.originalUrl,
      data: req.body,
      headers: req.headers
    });
  }
};
