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
const passport = require('passport');
let userRouter = express.Router();
let upload = multer({dest: "uploads/"});
let uploadImg = upload.single("profileImg");

userRouter.post("/auth/login", user.login, function(req, res){
  res.redirect("/");
});

userRouter.get('/auth/google', function(req, res, next) {
  passport.authenticate('google', {scope: ['profile'], session: false}, function(err, user) {
    let respond = response.success(res);
    let respondErr = response.failure(res, moduleId);
    if (err) {
      return next(err);
    }
    if (!user) {
      res.redirect('/login');
    }
    let token = auth.createToken(user);
    respond(http.OK, "Logged In!", {token, user});
    return res.redirect('/dashboard')

  })(req, res, next);
});


userRouter.get('/auth/google/redirect', passport.authenticate('google', { session: false, failureRedirect: '/login'}));

//userRouter.post("/login", user.login);
//userRouter.get('/logout');
userRouter.route("/")
  .post(user.createUser)
  .put(auth.checkToken, user.editUser)
  .get(auth.checkToken, user.getUser);

userRouter.post("/img", uploadImg, auth.checkToken, user.setProfileImg);

module.exports = userRouter;