const serviceRegistry = require("../../config/serviceregistry");
const request = require("./request");
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

  getEndPointFromServiceURL: url => {
    //parse service name from URL
    let service = url.substring(1);
    const subPathSeperator = service.indexOf("/");
    if (subPathSeperator > 0) {
      service = service.substring(0, subPathSeperator);
    }
    service = service + "Service";

    request
      .request(config.serviceRegistry + "/" + service, "GET", {}, req.headers)
      .then(response => {
        return response.data.data.endpoint;
      })
      .catch(error => {
        return undefined;
      });
  }
};
