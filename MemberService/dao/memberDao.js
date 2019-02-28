const MemberSchema = require("../model/memberSchema");
const Member = require("../model/member");

module.exports = class MemberDao {
  mapDataToModel(data) {
    if (!data) return null;
    const member = new Member(data.id, data.name);
    return member;
  }

  update(member) {
    return new Promise((resolve, reject) => {
      MemberSchema.findOneAndUpdate(
        { id: member.id },
        {
          name: member.name
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

  add(member) {
    var newSales = MemberSchema({
      id: member.id,
      name: member.name
    });

    return newSales.save();
  }

  findAll() {
    return new Promise((resolve, reject) => {
      MemberSchema.find()
        .exec()
        .then(data => {
          let members = [];
          for (let i = 0; i < data.length; i++) {
            members[i] = this.mapDataToModel(data[i]);
          }
          resolve(members);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      MemberSchema.find({ id: id })
        .exec()
        .then(data => {
          const member = this.mapDataToModel(data[0]);
          resolve(member);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      MemberSchema.remove({ id: id })
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
