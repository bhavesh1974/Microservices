const ModelSchema = require("../model/registrySchema");
const Model = require("../model/registry");
const BaseDao = require("../shared/dao/baseDao");

module.exports = class RegistryDao extends BaseDao {
  constructor() {
    super(ModelSchema, Model);
  }

  mapDataToModel(data) {
    if (!data) return null;
    const model = new Model(data._id, data.name, data.endpoint);
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
      name: model.name,
      endpoint: model.endpoint
    });
    return newModel;
  }

  buildUpdateModel(model) {
    const criteria = { _id: model.id };
    const updateModel = {
      name: model.name,
      endpoint: model.endpoint
    };
    return { criteria: criteria, model: updateModel };
  }
};
