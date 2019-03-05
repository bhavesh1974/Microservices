"use strict";

const chai = require("chai");
const expect = require("chai").expect;

chai.use(require("chai-http"));

let token = "";
let id = "";

describe("Microservice APIs", function() {
  before(function() {});
  after(function() {});

  // GET  /auth/getToken
  it("Get Token", function() {
    return chai
      .request("http://localhost:3000")
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

  // POST /registry
  it("Add Member", function() {
    return chai
      .request("http://localhost:3000")
      .post("/registry")
      .set({ Authorization: "Bearer " + token })
      .send({
        name: "NewService",
        endpoint: "http://localhost:3999"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        id = res.body.id;
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // GET /registry/{id}
  it("Get Member", function() {
    return chai
      .request("http://localhost:3000")
      .get("/registry/" + id)
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.data.name).eq("NewService");
      });
  });

  // PUT /registry/{id}
  it("Update Member", function() {
    return chai
      .request("http://localhost:3000")
      .put("/registry/" + id)
      .set({ Authorization: "Bearer " + token })
      .send({
        name: "NewService-Updated"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully updated.");
      });
  });

  // DELETE /registry/{id}
  it("Delete Member", function() {
    return chai
      .request("http://localhost:3000")
      .delete("/registry/" + id)
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully deleted.");
      });
  });
});
