/**
 *
 * jshint esversion: 6
 * @author ChikeUdenze
 * @since 10/21/17
 */

let express = require("express");

let user = require("./user");
let {checkToken} = require("../../../utils/authToken");

let userRouter = express.Router();

userRouter.route("/")
    .get(checkToken, user.getUser())
    .get(checkToken, user.editUser());

userRouter.get("/all", checkToken(), user.getUsers());
userRouter.post("/new", user.createUser);
userRouter.delete("/del", checkToken, user.deleteUser());

module.exports = userRouter;