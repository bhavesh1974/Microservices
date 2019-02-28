var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  id: String,
  name: String
});

var Member = mongoose.model("member", schema);

module.exports = Member;
