var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: String,
  endpoint: String
});

var Schema = mongoose.model("serviceRegistry", schema);

module.exports = Schema;
