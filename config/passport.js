const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const auth = require('./auth');
const User = require('../app/models/user').User;


passport.use(new GoogleStrategy({
    clientID: auth.googleAuth.clientID,
    clientSecret: auth.googleAuth.clientSecret,
    callbackURL: '/api/u/auth/google/redirect'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }).exec().then((currentUser) => {
      if (currentUser){
        console.log(`Current user's profile id is : ${profile.id}`);
        done(null, currentUser);
      }
      else{
        console.log('No Google user found');
        done(null, false, { message: 'No Google User found' });
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
