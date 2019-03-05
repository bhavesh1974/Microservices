const axios = require("axios");

module.exports = {
  forward: (endpoint, req) => {
    return axios({
      method: req.method.toLowerCase(),
      url: endpoint + req.originalUrl,
      data: req.body,
      headers: req.headers
    });
  },
  request: (url, method, data, headers) => {
    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  }
};
