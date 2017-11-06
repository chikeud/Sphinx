/**
 *
 * jshint esversion: 6
 * @author ChikeUdenze
 * @since 10/21/17
 */

let express = require("express");

let user = require("./user");

let userRouter = express.Router();

userRouter.post("/new",user.createUser);

module.exports = userRouter;