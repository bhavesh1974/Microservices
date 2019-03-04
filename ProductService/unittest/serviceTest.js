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
        id = res.body.id;
        expect(res.body.message).eq("It is successfully added.");
      });
  });

  // GET /products/{id}
  it("Get Product", function() {
    return chai
      .request("http://localhost:3000")
      .get("/products/" + id)
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.data.name).eq("ProductTest");
      });
  });

  // PUT /products/{id}
  it("Update Product", function() {
    return chai
      .request("http://localhost:3000")
      .put("/products/" + id)
      .set({ Authorization: "Bearer " + token })
      .send({
        name: "ProductTest-Updated"
      })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully updated.");
      });
  });

  // DELETE /products/{id}
  it("Delete Product", function() {
    return chai
      .request("http://localhost:3000")
      .delete("/products/" + id)
      .set({ Authorization: "Bearer " + token })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an("object");
        expect(res.body.message).eq("It is successfully deleted.");
      });
  });
});
