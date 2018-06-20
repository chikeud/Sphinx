/* eslint-disable */
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
  let token;

  context("User Creation", () => {
    it("should return user and jwt with _id and alias", async () => {
      let u = "user1";
      // let profileImg = fs.readFileSync(`${__dirname}/imgs/${u}.jpg`);

      let keys = Object.keys(mock[u]);
      let addressKeys = Object.keys(mock[u].address);
      let res = await request.post("/api/u")
        .send(mock[u]);
      let {user, token: _token} = res.body.result;
      let decoded = await jwt.verifyAsync(_token, config.SECRET);

      token = _token;

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

      expect(res).to.have.status(http.CREATED);
      expect(decoded["alias"]).to.equal(mock.user1["alias"]);
      expect(decoded._id).to.equal(user._id);
    });
  });

  context("Profile Image Upload", () => {
    it("should set a user's profile image", async () => {
      let filename = "user1.jpg";
      let buffer = fs.readFileSync(`${__dirname}/imgs/${filename}`);

      let res = await request
        .post("/api/u/img")
        .set(config.AUTH_TOKEN, token)
        .attach("profileImg", buffer, filename)
        .send(null);

      let {user} = res.body.result;
      let data = user.profileImg.file.metadata;

      expect(res).to.have.status(http.CREATED);
      expect(data.originalname).to.equal(filename);
    });
  });

  context("Settings test", () => {
    it("should edit and return a user", async () => {
        let u1 = "edited"; //user with properties to copy
        let u2 = "toEdit";//user to edit

        let keys = Object.keys(mock[u1]);
        let addressKeys = Object.keys(mock[u1].address);

        let res = await request.post("/api/u/")
            .send(mock[u2]);
        let {user, token: _token} = res.body.result;

        //edit user
        res = await request.put("/api/u")
            .set(config.AUTH_TOKEN, _token)
            .send(mock[u1]);
        user = res.body.result.user;

        for(let key of keys){
            if(key === "password" || key === "ssn"){
                expect(bcrypt.compareSync(mock.edited[key], user[key])).to.be.true;
            }
            else if(key === "address"){
                for(let addKey of addressKeys){
                    expect(mock.edited.address[addKey]).to.equal(user.address[addKey]);
                }
            }
            else{
                expect(mock.edited[key]).to.equal(user[key]);
            }
        }

        expect(res).to.have.status(http.OK);
    });
  })

});