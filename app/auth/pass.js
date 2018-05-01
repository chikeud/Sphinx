/**
 * @author EmmanuelOlaojo
 * @author ChikeUdenze
 * @since 4/30/18
 */

const findOrCreate = require("mongoose-findorcreate");
const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  FacebookStrategy = require("passport-facebook").Strategy;
  GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

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

passport.use(new FacebookStrategy({
    clientID: 'edc22e0ea7e1de98964a35c222191248', // TODO add to .env file
    clientSecret: "edc22e0ea7e1de98964a35c222191248", // TODO add to .env file
    callbackURL: "http://localhost:8787/auth/facebook/callback" // TODO add to .env file
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ facebookId: profile.id }, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

passport.use(new GoogleStrategy({
  clientID: "146856721457-pv5vmqe1iptmtv0vf416lo5tvl5a0ip6.apps.googleusercontent.com", // TODO add to .env file
  clientSecret: "u8AWTeoVuwWQh58AxZyAPYmg", // TODO add to .env file
  callbackURL: "http://localhost:8787/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    this.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));
module.exports.authenticate = function(req, res, next){
  passport.authenticate(req.body.authType, {session: false})(req, res, next);
};

