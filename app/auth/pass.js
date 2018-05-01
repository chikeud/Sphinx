/**
 * @author EmmanuelOlaojo
 * @since 4/30/18
 */

let passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy;
  // FacebookStrategy = require("passport-facebook").Strategy,
  // GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

let User = require("../models/user").User;


passport.use(new LocalStrategy( {usernameField: "alias"},
  function(username, password, done) {
    User.findOne({ username }, async function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }

      try{
        if (! await user.validPass(password)) { return done(null, false); }
      }
      catch(err){
        return done(err);
      }

      done(null, user);
    });
  }
));

module.exports.authenticate = function(req, res, next){
  passport.authenticate(req.body.authType, {session: false})(req, res, next);
};

