/**
 * @author EmmanuelOlaojo
 * @since 10/21/17
 */

let express = require("express");
let multer = require("multer");

let user = require("./user");
let auth = require("../../../utils/authToken");
// let pass = require("../../auth/pass");

let userRouter = express.Router();
let upload = multer({dest: "uploads/"});

userRouter.route("/")
  .post(upload.single("profileImg"), user.createUser)
  .put(auth.checkToken, user.editUser)
  .get(auth.checkToken, user.getUser);

userRouter.post("/login", user.login);

module.exports = userRouter;