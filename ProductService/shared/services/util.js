module.exports = {
  parseServiceFromURL: url => {
    //parse service name from URL
    let service = url.substring(1);
    service = service.substring(0, service.indexOf("/"));
    service = service + "Service";
    return service;
  }
};
