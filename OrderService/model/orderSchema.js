var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  productId: String,
  memberId: String,
  qty: Number,
  rate: Number,
  note: String
});

var Schema = mongoose.model("order", schema);

module.exports = Schema;
