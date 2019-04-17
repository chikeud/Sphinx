/**
 * @author Chike Udenze
 * @since 12/30/18
 */

let express = require("express");
let passport = require("passport");

let auth = require("./auth");

let router = express.Router();

auth.setup();

// Facebook login
router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback", passport.authenticate("facebook", {session: false, failureRedirect: '/login' }), auth.grantToken);

// Google login
router.get("/google", passport.authenticate("google", {scope: ["email", "profile"], session: false}));
router.get("/google/callback", passport.authenticate("google",{ failureRedirect: '/login' }), auth.grantToken);


module.exports = router;