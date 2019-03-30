let LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  User = require('../app/models/user').User,
  // bcrypt = require('bcrypt'),
  authToken = require('../utils/authToken');
  config = require('./index');


module.exports = (passport) => {
  // Serialize sessions
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  // Deserialize sessions
  passport.deserializeUser((id, done) => {
    User.findOne({
      _id: id
    }, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new LocalStrategy({
    usernameField: 'alias'
  },
     (username, password, done) => {
    
      User.findOne({ email: username }, (err, user) => {
        if (err) { return done(err); }
        // Return if user not found in database
        if (!user) {
          return done(null, false, {
            message: 'Account was not found'
          });
        }

        // validate password
        user.validPass(password).then(match => {
          // Return if password is wrong
          // let authorized = user.validPass(password);
          if (!match) {
            return done(null, false, {
              message: 'Password is wrong'
            });
          }
          // If credentials are correct, return the user object
          return done(null, user);
        }).catch((err) => {
          done(err);
        })
        
      });
    }
  ));

  // passport.use(new GoogleStrategy({
  //   clientID: config.GOOGLE_CREDENTIALS.clientID,
  //   clientSecret: config.GOOGLE_CREDENTIALS.clientSecret,
  //   callbackURL: config.GOOGLE_CREDENTIALS.callbackURL
  // },
  //   (token, tokenSecret, profile, done) => {
  //     const data = {
  //       'email': profile.emails[0].value,
  //       'name': profile.displayName
  //     };

  //     UserAuth.findOrCreate({ email: data.email }, data, function (err, user) {
  //       if (user) {
  //         user.token = user.generateJwt();
  //       }
  //       return done(err, user);
  //     });
  //   }));

  passport.use(new FacebookStrategy({
    clientID: config.FACEBOOK_CREDENTIALS.clientID,
    clientSecret: config.FACEBOOK_CREDENTIALS.clientSecret,
    callbackURL: config.FACEBOOK_CREDENTIALS.callbackURL,
    profileFields: ['id', 'email', 'name']
  },
    (token, tokenSecret, profile, done) => {
      console.log(profile);
      const data = {
        'email': profile._json.email,
        'name': profile._json.first_name + ' ' + profile._json.last_name
      };

      User.findOrCreate({ email: data.email }, data, function (err, user) {
        console.log(user);
        if (user) {
          token = authToken.createToken();
        }
        return done(err, {token, user});
      });
    }));
}
