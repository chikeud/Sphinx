/**
 * @author EmmanuelOlaojo
 * @since 10/21/17
 */

let moduleId = 'user/index';

let express = require("express");
let multer = require("multer");
let user = require("./user");
let auth = require("../../../utils/authToken");
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let userRouter = express.Router();
let upload = multer({dest: "uploads/"});
let uploadImg = upload.single("profileImg");
let authRouter = require("./auth");
let passRouter = require('./password');

userRouter.use("/auth", authRouter);
userRouter.use('/', passRouter);

userRouter.post("/auth/login", user.login, function(_req, res){
  res.redirect("/");
});

userRouter.post("/auth/loginn", user.loginn, function(_req, res){
  res.redirect("/");
});

userRouter.get("/auth/logout", user.signout, function(_req, res){
  res.redirect("/");
});

userRouter.route("/")
  .post(user.createUser)
  .put(auth.checkToken, user.editUser)
  .get(auth.checkToken, user.getUser);
userRouter.post("/img", uploadImg, auth.checkToken, user.setProfileImg);

module.exports = userRouter;