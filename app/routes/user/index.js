/**
 * @author EmmanuelOlaojo
 * @since 10/21/17
 */

let express = require("express");

let user = require("./user");

let userRouter = module.exports = express.Router();

userRouter.route("/u")
  .post(user.createUser);
