const chai = require("chai");
const chaiHttp = require("chai-http");
const { server } = require("../server");
const expect = chai.expect;
const { pool } = require("../db");

chai.use(chaiHttp);

describe("API Endpoints", () => {
  let transaction;
  before(async () => {
    try {
      await pool.connect();
      transaction = await pool.beginTransaction();
    } catch (err) {
      console.error("Error connecting to the database:", err);
    }
  });

  after(async () => {
    try {
      await transaction.rollback();
      await pool.end();
    } catch (err) {
      console.error("Error disconnecting from the database:", err);
    }
  });
  describe("Server API", () => {
    it('should return "Hello, Express!" on the root route', async () => {
      const res = await chai.request(server).get("/");
      expect(res).to.have.status(200);
      expect(res.text).to.equal("Hello, Express!");
    });

    it("should return a 404 status on a non-existing route", async () => {
      const res = await chai.request(server).get("/non-existing-route");
      expect(res).to.have.status(404);
    });
  });

  describe("Users API", () => {
    describe("GET /users", () => {
      it("should return a list of users", async () => {
        const res = await chai.request(server).get("/users");
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
      });
    });

    describe("PUT /users/:user_id", () => {
      it("should update a user", async () => {
        const user_id_existing = 5;
        const updatedUser = {
          username: "new-username",
          email: "new-email@example.com",
          password: "new-password",
        };
        const res = await chai
          .request(server)
          .put(`/users/${user_id_existing}`)
          .send(updatedUser);
        expect(res).to.have.status(200);
        expect(res.text).to.include(
          `User modified with ID: ${user_id_existing}`
        );
      });
    });

    describe("DELETE /users/:user_id", () => {
      it("should delete a user", async () => {
        const user_id = 5;
        const res = await chai.request(server).delete(`/users/${user_id}`);
        expect(res).to.have.status(200);
        expect(res.text).to.include(`User deleted with ID: ${user_id}`);
      });
    });
  });
});
