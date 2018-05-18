/**
 * @author EmmanuelOlaojo
 * @since 5/18/18
 */

let bcrypt = require("bcrypt");
let jwt = Promise.promisifyAll(require("jsonwebtoken"));
let chai = require("chai");
let expect = chai.expect;

let http = require("../../utils/HttpStats");
let config = require("../../config");
let mock = require("./mock.users");
let SERVER_URL = `http://localhost:${config.PORT}`;