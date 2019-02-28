module.exports = class Gift {
  constructor(memberId, recipientMemberId, giftYear) {
    this.memberId = memberId;
    this.recipientMemberId = recipientMemberId;
    this.giftYear = giftYear;
  }
};
