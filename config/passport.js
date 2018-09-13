const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('./auth');
const User = require('../app/models/user').User;

passport.use(new LocalStrategy({
    usernameField: 'alias',
    passwordField: 'password'
  },
  function (alias, password, cb) {
    //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
    return User.findOne({ alias, password })
      .then(user => {
        if (!user) {
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        return cb(null, user, { message: 'Logged In Successfully' });
      })
      .catch(err => cb(err));
  }
));


passport.use(new GoogleStrategy({
    clientID: auth.googleAuth.clientID,
    clientSecret: auth.googleAuth.clientSecret,
    callbackURL: '/api/u/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    User.findOne({ googleID: profile.id }).exec().then((currentUser) => {
      if (currentUser){
        console.log(currentUser);
        done(null, currentUser);
      }
      else{
        done(null, false);
        //next();
      }
    });

  })
);

passport.use(new FacebookStrategy({
    clientID: auth.facebookAuth.clientID,
    clientSecret: auth.facebookAuth.clientSecret,
    callbackURL: '/api/u/auth/facebook/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    User.findOne({ facebookID: profile.id }).exec().then((currentUser) => {
      if (currentUser){
        console.log(currentUser);
        done(null, currentUser);
      }
      else{
        done(null, false);
      }
    });

  })
);
