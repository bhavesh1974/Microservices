const MemberDao = require("../dao/memberDao");
const Member = require("../model/member");

exports.getMembers = (req, res, next) => {
  let memberDao = new MemberDao();
  memberDao
    .findAll()
    .then(data => {
      res.status(200).json({
        code: 200,
        data: data
      });
    })
    .catch(error => {
      logger.error(__filename + " > members", error);
      throw error;
    });
};

exports.insert = (req, res, next) => {
  const memberDao = new MemberDao();
  const member = new Member(req.body.id, req.body.name);
  memberDao
    .add(member)
    .then(() => {
      res.status(200).json({
        code: 200,
        message: "Member successfully added."
      });
    })
    .catch(error => {
      logger.error(__filename + " > save", error);
      throw error;
    });
};

exports.getMember = (req, res, next) => {
  const memberDao = new MemberDao();
  memberDao
    .findById(req.params.id)
    .then(data => {
      res.json({
        code: 200,
        data: data
      });
    })
    .catch(error => {
      logger.error(__filename + " > getMember", error);
      throw error;
    });
};

exports.update = (req, res, next) => {
  const memberDao = new MemberDao();
  const member = new Member(req.params.id, req.body.name);
  memberDao
    .update(member)
    .then(data => {
      res.status(200).json({
        code: 200,
        message: "Member successfully updated."
      });
    })
    .catch(error => {
      logger.error(__filename + " > update", error);
      throw error;
    });
};

exports.delete = (req, res, next) => {
  /*It is required to delete member records from gift exchange 
  It should call from GiftService api to delete such records */
  const memberDao = new MemberDao();
  memberDao
    .delete(req.params.id)
    .then(data => {
      res.json({
        code: 200,
        message: "Member successfully deleted."
      });
    })
    .catch(error => {
      logger.error(__filename + " > delete", error);
      throw error;
    });
};
