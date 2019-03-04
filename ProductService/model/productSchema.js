var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  name: String,
  category: String
});

var Schema = mongoose.model("product", schema);

module.exports = Schema;
