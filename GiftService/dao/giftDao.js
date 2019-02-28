const GiftSchema = require("../model/giftSchema");
const Gift = require("../model/gift");

module.exports = class GiftDao {
  mapDataToModel(data) {
    if (!data) return null;
    const gift = new Gift(data.memberId, data.recipientMemberId, data.giftYear);
    return gift;
  }

  update(gift) {
    return new Promise((resolve, reject) => {
      GiftSchema.findOneAndUpdate(
        { memberId: gift.memberId, giftYear: gift.giftYear },
        {
          recipientMemberId: gift.recipientMemberId
        },
        function(error) {
          if (error) {
            reject(error);
          }
          resolve("Success");
        }
      );
    });
  }

  add(gift) {
    var newSales = GiftSchema({
      memberId: gift.memberId,
      recipientMemberId: gift.recipientMemberId,
      giftYear: gift.giftYear
    });

    return newSales.save();
  }

  findByGiftYear(giftYear) {
    return new Promise((resolve, reject) => {
      GiftSchema.find({ giftYear: giftYear })
        .exec()
        .then(data => {
          let gifts = [];
          for (let i = 0; i < data.length; i++) {
            gifts[i] = this.mapDataToModel(data[i]);
          }
          resolve(gifts);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findByMemberIdandGiftYear(memberId, giftYear) {
    return new Promise((resolve, reject) => {
      GiftSchema.find({ memberId: memberId, giftYear: giftYear })
        .exec()
        .then(data => {
          const gift = this.mapDataToModel(data[0]);
          resolve(gift);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  delete(memberId, giftYear) {
    return new Promise((resolve, reject) => {
      GiftSchema.remove({ memberId: memberId, giftYear: giftYear })
        .exec()
        .then(data => {
          resolve("Success");
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
