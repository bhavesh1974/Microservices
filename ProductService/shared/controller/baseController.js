module.exports = class BaseController {
  constructor(dao) {
    this.dao = dao;
  }

  get() {
    return (req, res, next) => {
      this.dao
        .findById(req.params.id)
        .then(data => {
          res.json({
            code: 200,
            data: data
          });
        })
        .catch(error => {
          logger.error(__filename + " > get", error);
          throw error;
        });
    };
  }

  getAll() {
    return (req, res, next) => {
      this.dao
        .findAll()
        .then(data => {
          res.status(200).json({
            code: 200,
            data: data
          });
        })
        .catch(error => {
          logger.error(__filename + " > getAll", error);
          throw error;
        });
    };
  }

  buildAddModel(req) {
    return {};
  }
  add() {
    return (req, res, next) => {
      const model = this.buildAddModel(req);
      this.dao
        .add(model)
        .then(id => {
          res.status(200).json({
            code: 200,
            message: "It is successfully added.",
            id: id
          });
        })
        .catch(error => {
          logger.error(__filename + " > save", error);
          throw error;
        });
    };
  }

  buildUpdateModel(req) {
    return {};
  }
  update() {
    return (req, res, next) => {
      const model = this.buildUpdateModel(req);
      this.dao
        .update(model)
        .then(data => {
          res.status(200).json({
            code: 200,
            message: "It is successfully updated."
          });
        })
        .catch(error => {
          logger.error(__filename + " > update", error);
          throw error;
        });
    };
  }

  delete() {
    return (req, res, next) => {
      this.dao
        .delete(req.params.id)
        .then(data => {
          res.json({
            code: 200,
            message: "It is successfully deleted."
          });
        })
        .catch(error => {
          logger.error(__filename + " > delete", error);
          throw error;
        });
    };
  }
};
