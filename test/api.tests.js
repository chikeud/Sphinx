/* eslint-disable no-undef */
/**
 * @author EmmanuelOlaojo
 * @since 5/17/18
 */

let fs = require("fs");
let path = require("path");
let mongoose = require("mongoose");
let chai = require("chai");
let chaiHttp = require("chai-http");
mongoose.Promise = global.Promise = require("bluebird");

require("dotenv").config();

let {DB_URL} = require("../config");

mongoose.connect(DB_URL);
let conn = mongoose.connection;

chai.use(chaiHttp);

describe("All Tests", () => {
  after(async () => {
    await conn.dropDatabase();
    return await conn.close();
  });

  require("./auth");
});