const serviceRegistry = require("../../config/serviceregistry");
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
    if (serviceRegistry.repository.hasOwnProperty(service)) {
      return serviceRegistry.repository[service];
    } else {
      return undefined;
    }
  }
};
