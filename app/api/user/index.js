/**
 * @author EmmanuelOlaojo
 * @since 10/21/17
 */

let express = require("express");
let multer = require("multer");
let user = require("./user");
let auth = require("../../../utils/authToken");
const passport = require('passport');
let userRouter = express.Router();
let upload = multer({dest: "uploads/"});
let uploadImg = upload.single("profileImg");

userRouter.post("/auth/login", user.login, function(req, res){
  res.redirect("/");
});


userRouter.get('/auth/google', passport.authenticate('google', {
  scope: ['profile'],
  session: false
}));
userRouter.get('/auth/google/redirect', passport.authenticate('google', { session: false, failureRedirect: '/' }), auth.serialize, auth.generateToken, auth.respond);

//userRouter.post("/login", user.login);
//userRouter.get('/logout');
userRouter.route("/")
  .post(user.createUser)
  .put(auth.checkToken, user.editUser)
  .get(auth.checkToken, user.getUser);

userRouter.post("/img", uploadImg, auth.checkToken, user.setProfileImg);

module.exports = userRouter;