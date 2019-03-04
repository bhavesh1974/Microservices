const axios = require("axios");

module.exports = {
  request: (url, method, data, headers) => {
    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    });
  }
};
