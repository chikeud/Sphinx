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
let uploadImg = upload.single("profileImg");

userRouter.post("/login", user.login);

userRouter.route("/")
  .post(user.createUser)
  .put(auth.checkToken, user.editUser)
  .get(auth.checkToken, user.getUser);

userRouter.post("/img", uploadImg, auth.checkToken, user.setProfileImg);

module.exports = userRouter;