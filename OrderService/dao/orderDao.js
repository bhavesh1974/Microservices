const ModelSchema = require("../model/orderSchema");
const Model = require("../model/order");
const BaseDao = require("../shared/dao/baseDao");

module.exports = class OrderDao extends BaseDao {
  constructor() {
    super(ModelSchema, Model);
  }

  mapDataToModel(data) {
    if (!data) return null;
    const model = new Model(
      data._id,
      data.productId,
      data.memberId,
      data.qty,
      data.rate
    );
    return model;
  }

  buildAddModel(model) {
    var newModel = ModelSchema({
      productId: model.productId,
      memberId: model.memberId,
      qty: model.qty,
      rate: model.rate
    });
    return newModel;
  }

  buildUpdateModel(model) {
    const criteria = { _id: model.id };
    const updateModel = {
      productId: model.productId,
      memberId: model.memberId,
      qty: model.qty,
      rate: model.rate
    };
    return { criteria: criteria, model: updateModel };
  }
};
