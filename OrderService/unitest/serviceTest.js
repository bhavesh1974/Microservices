"use strict";

const chai = require("chai");
const expect = require("chai").expect;

chai.use(require("chai-http"));

let token = "";
let id = "";
let productId = "";

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

  // POST /products
  it("Add Product", function() {
    return chai
      .request("http://localhost:3000")
      .post("/products")
      .set({ Authorization: "Bearer " + token })
      .send({
        name: "ProductTest",
        category: "CategoryTest"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        productId = res.body.id;
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // POST /orders
  it("Add Order", function() {
    return chai
      .request("http://localhost:3000")
      .post("/orders")
      .set({ Authorization: "Bearer " + token })
      .send({
        productId: productId,
        memberId: "UNITEST101",
        qty: 10,
        rate: 10
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        id = res.body.id;
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // GET /orders/{id}
  it("Get Order", function() {
    return chai
      .request("http://localhost:3000")
      .get("/orders/" + id)
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.data.productId).eq(productId);
      });
  });

  // PUT /orders/{id}
  it("Update Order", function() {
    return chai
      .request("http://localhost:3000")
      .put("/orders/" + id)
      .set({ Authorization: "Bearer " + token })
      .send({
        productId: "UNITEST101",
        memberId: "UNITEST101",
        qty: 100,
        rate: 100
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully updated.");
      });
  });

  // DELETE /orders/{id}
  it("Delete Order", function() {
    return chai
      .request("http://localhost:3000")
      .delete("/orders/" + id)
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully deleted.");
      });
  });

  // DELETE /products/{id}
  it("Delete Product", function() {
    return chai
      .request("http://localhost:3000")
      .delete("/products/" + productId)
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully deleted.");
      });
  });
});
