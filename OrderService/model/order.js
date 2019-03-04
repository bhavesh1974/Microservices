module.exports = class Order {
  constructor(id, productId, memberId, qty, rate) {
    this.id = id;
    this.productId = productId;
    this.memberId = memberId;
    this.qty = qty;
    this.rate = rate;
  }
};
