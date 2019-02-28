var mongoose = require("mongoose");

var schema = new mongoose.Schema({
  memberId: String,
  recipientMemberId: String,
  giftYear: Number
});

var Gift = mongoose.model("giftExchange", schema);

module.exports = Gift;
