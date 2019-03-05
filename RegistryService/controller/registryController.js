const Dao = require("../dao/registryDao");
const Model = require("../model/registry");
const BaseController = require("../shared/controller/baseController");

module.exports = class RegistryController extends BaseController {
  constructor() {
    super(new Dao());
  }

  searchByName() {
    return (req, res, next) => {
      this.dao
        .findByName(req.params.name)
        .then(data => {
          res.json({
            code: 200,
            data: data
          });
        })
        .catch(error => {
          logger.error(__filename + " > searchByName", error);
          throw error;
        });
    };
  }

  buildAddModel(req) {
    return new Model(null, req.body.name);
  }
  buildUpdateModel(req) {
    return new Model(req.params.id, req.body.name);
  }
};
