const GiftDao = require("../dao/giftDao");
const Gift = require("../model/gift");

exports.getByGiftYear = (req, res, next) => {
  let giftDao = new GiftDao();
  giftDao
    .findByGiftYear(req.params.giftYear)
    .then(data => {
      res.status(200).json({
        code: 200,
        data: data
      });
    })
    .catch(error => {
      logger.error(__filename + " > getByGiftYear", error);
      throw error;
    });
};

exports.insert = (req, res, next) => {
  const giftDao = new GiftDao();
  const gift = new Gift(
    req.body.memberId,
    req.body.recipientMemberId,
    req.body.giftYear
  );
  giftDao
    .add(gift)
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Gift successfully added."
      });
    })
    .catch(error => {
      logger.error(__filename + " > save", error);
      throw error;
    });
};

exports.getMemberIdandGiftYear = (req, res, next) => {
  const giftDao = new GiftDao();
  giftDao
    .findByMemberIdandGiftYear(req.params.memberId, req.params.giftYear)
    .then(data => {
      res.json({
        code: 200,
        data: data
      });
    })
    .catch(error => {
      logger.error(__filename + " > getMemberIdandGiftYear", error);
      throw error;
    });
};

exports.update = (req, res, next) => {
  const giftDao = new GiftDao();
  const gift = new Gift(
    req.params.memberId,
    req.body.recipientMemberId,
    req.params.giftYear
  );
  giftDao
    .update(gift)
    .then(data => {
      res.status(200).json({
        code: 200,
        message: "Gift successfully updated."
      });
    })
    .catch(error => {
      logger.error(__filename + " > update", error);
      throw error;
    });
};

exports.delete = (req, res, next) => {
  /*It is required to delete gift records from gift exchange 
  It should call from GiftService api to delete such records */
  const giftDao = new GiftDao();
  giftDao
    .delete(req.params.memberId, req.params.giftYear)
    .then(data => {
      res.json({
        code: 200,
        message: "Gift successfully deleted."
      });
    })
    .catch(error => {
      logger.error(__filename + " > delete", error);
      throw error;
    });
};

exports.shuffle = (req, res, next) => {
  //Just psuedo code
  /* 
    Validation should be placed that there should be more than 3 members then only it could shuffle properly after 3 years of giftExchange    
  */
  /*
  #1: Call GET /members service to pull list of all the members
  #2: First loop iterate through all members
       store to memberId
  #3: Get the member from first loop and make another sub loop to iterate through other members
       store to recipientId (skip record if memberId = recipientId)
  #4: Find in giftexchanges for memberId and receiptId and (giftYear -1 or giftYear -2 or giftYear - 3)
        if record exist then go to next recipientId
        if no record exist then assign recipientId and exist from second loop
  */
  res.json({
    code: 200,
    message: "Service is under development."
  });
};
