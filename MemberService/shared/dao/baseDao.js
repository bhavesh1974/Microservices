class BaseDao {
  constructor(modelSchema, model) {
    this.modelSchema = modelSchema;
    this.model = model;
  }

  mapDataToModel(data) {}
  retrieve(criteria, resolve, reject) {
    this.modelSchema
      .find(criteria)
      .exec()
      .then(data => {
        if (data.length == 1) {
          const model = this.mapDataToModel(data[0]);
          resolve(model);
        } else {
          let models = [];
          for (let i = 0; i < data.length; i++) {
            models[i] = this.mapDataToModel(data[i]);
          }
          resolve(models);
        }
      })
      .catch(error => {
        reject(error);
      });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      const criteria = {};
      this.retrieve(criteria, resolve, reject);
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      const criteria = { _id: id };
      this.retrieve(criteria, resolve, reject);
    });
  }

  buildUpdateModel(model) {
    return { criteria: { id: 0 }, model: { id: 0 } };
  }
  update(model) {
    return new Promise((resolve, reject) => {
      const updatedModel = this.buildUpdateModel(model);
      this.modelSchema.findOneAndUpdate(
        updatedModel.criteria,
        updatedModel.model,
        function(error) {
          if (error) {
            reject(error);
          }
          resolve("Success");
        }
      );
    });
  }

  buildAddModel(model) {
    return {};
  }
  add(model) {
    const newModel = this.buildAddModel(model);
    return new Promise((resolve, reject) =>
      newModel.save(function(error, model) {
        if (error) reject(error);
        resolve(model.id);
      })
    );
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      this.modelSchema
        .remove({ _id: id })
        .exec()
        .then(data => {
          resolve("Success");
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

module.exports = BaseDao;
