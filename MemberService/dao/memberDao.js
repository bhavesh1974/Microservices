const ModelSchema = require("../model/memberSchema");
const Model = require("../model/member");
const BaseDao = require("../shared/dao/baseDao");

module.exports = class ProductDao extends BaseDao {
  constructor() {
    super(ModelSchema, Model);
  }

  mapDataToModel(data) {
    if (!data) return null;
    const model = new Model(data._id, data.name);
    return model;
  }

  findByName(name) {
    return new Promise((resolve, reject) => {
      const criteria = { name: name };
      this.retrieve(criteria, resolve, reject);
    });
  }

  buildAddModel(model) {
    var newModel = ModelSchema({
      name: model.name
    });
    return newModel;
  }

  buildUpdateModel(model) {
    const criteria = { _id: model.id };
    const updateModel = {
      name: model.name
    };
    return { criteria: criteria, model: updateModel };
  }
};
