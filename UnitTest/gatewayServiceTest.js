"use strict";

const chai = require("chai");
const expect = require("chai").expect;

chai.use(require("chai-http"));

const app = require("../GatewayService/app"); // GatewayService - This server should not be running as this unit test will start the server on same port
let token = "";

describe("Microservice APIs", function() {
  before(function() {});
  after(function() {});

  // GET  /auth/getToken
  it("Get Token", function() {
    return chai
      .request(app)
      .post("/auth/getToken")
      .send({
        userName: "bhavesh",
        password: "12345678"
      })
      .then(function(res) {
        token = res.body.token;
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
      });
  });

  // POST /members
  it("Add Member", function() {
    return chai
      .request(app)
      .post("/members")
      .set({ Authorization: "Bearer " + token })
      .send({
        id: "MemberTest",
        name: "MemberTest-Name"
      })
      .then(function(res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("Member successfully added.");
      });
  });

  // GET /members/{id}
  it("Get Member", function() {
    return chai
      .request(app)
      .get("/members/MemberTest")
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        console.log(res.body);
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.data.name).eq("MemberTest-Name");
      });
  });

  // PUT /members/{id}
  it("Update Member", function() {
    return chai
      .request(app)
      .put("/members/MemberTest")
      .set({ Authorization: "Bearer " + token })
      .send({
        name: "MemberTest-Name-Updated"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("Member successfully updated.");
      });
  });

  // DELETE /members/{id}
  it("Update Member", function() {
    return chai
      .request(app)
      .delete("/members/MemberTest")
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("Member successfully deleted.");
      });
  });
});
