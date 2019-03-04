const Dao = require("../dao/orderDao");
const Model = require("../model/order");
const BaseController = require("../shared/controller/baseController");
const util = require("../shared/services/util");
const request = require("../shared/services/request");

module.exports = class OrderController extends BaseController {
  constructor() {
    super(new Dao());
  }

  buildAddModel(req) {
    return new Model(
      null,
      req.body.productId,
      req.body.memberId,
      req.body.qty,
      req.body.rate
    );
  }

  buildUpdateModel(req) {
    return new Model(
      req.params.id,
      req.body.productId,
      req.body.memberId,
      req.body.qty,
      req.body.rate
    );
  }

  add() {
    return (req, res, next) => {
      const model = this.buildAddModel(req);
      const endpoint = util.getEndPointFromServiceURL("/products");
      if (endpoint == undefined) {
        res.status(500).json({
          code: 5001,
          message: "No endpoint defined for Product Service"
        });
      }

      request
        .request(
          endpoint + "/products/" + req.body.productId,
          "GET",
          {},
          req.headers
        )
        .then(response => {
          if (response.data.data.id == req.body.productId) {
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
          } else {
            res.status(400).json({
              code: 4001,
              message: "Invalid Product Id."
            });
          }
        })
        .catch(error => {
          res
            .status(503)
            .json({ status: "503", message: "Service unavailable" });
        });
    };
  }
};
