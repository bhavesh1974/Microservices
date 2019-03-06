"use strict";

const chai = require("chai");
const expect = require("chai").expect;

chai.use(require("chai-http"));

describe("Microservice APIs", function() {
  before(function() {});
  after(function() {});

  // POST /registry
  it("Add AuthService", function() {
    return chai
      .request("http://localhost:3006")
      .post("/registry")
      .send({
        name: "authService",
        endpoint: "http://localhost:3001"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // POST /registry
  it("Add MemberService", function() {
    return chai
      .request("http://localhost:3006")
      .post("/registry")
      .send({
        name: "membersService",
        endpoint: "http://localhost:3002"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // POST /registry
  it("Add ProductService", function() {
    return chai
      .request("http://localhost:3006")
      .post("/registry")
      .send({
        name: "productsService",
        endpoint: "http://localhost:3003"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // POST /registry
  it("Add OrderService", function() {
    return chai
      .request("http://localhost:3006")
      .post("/registry")
      .send({
        name: "ordersService",
        endpoint: "http://localhost:3004"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // POST /registry
  it("Add RegistryService", function() {
    return chai
      .request("http://localhost:3006")
      .post("/registry")
      .send({
        name: "registryService",
        endpoint: "http://localhost:3006"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully added.");
      });
  });
});
