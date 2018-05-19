/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 5/18/18
 */

let bcrypt = require("bcrypt");
let fs = require("fs");
let jwt = Promise.promisifyAll(require("jsonwebtoken"));
let chai = require("chai");
let expect = chai.expect;

let http = require("../../utils/HttpStats");
let config = require("../../config");
let mock = require("./mock.users");
let SERVER_URL = `http://localhost:${config.PORT}`;

module.exports = describe("Authentication Tests", () => {
  let request = chai.request(SERVER_URL);

  context("User Creation", () => {
    it("should return user and jwt with _id and alias", async () => {
      let u = "user1";
      // let profileImg = fs.readFileSync(`${__dirname}/imgs/${u}.jpg`);

      let keys = Object.keys(mock[u]);
      let addressKeys = Object.keys(mock[u].address);
      let res = await request.post("/api/u")
        .send(mock[u]);
      let {user, token} = res.body.result;
      let decoded = await jwt.verifyAsync(token, config.SECRET);

      for(let key of keys){
        if(key === "password" || key === "ssn"){
          expect(bcrypt.compareSync(mock.user1[key], user[key])).to.be.true;
        }
        else if(key === "address"){
          for(let addKey of addressKeys){
            expect(mock.user1.address[addKey]).to.equal(user.address[addKey]);
          }
        }
        else{
          expect(mock.user1[key]).to.equal(user[key]);
        }
      }

      expect(decoded["alias"]).to.equal(mock.user1["alias"]);
      expect(decoded._id).to.equal(user._id);
    });
  });
});