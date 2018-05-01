/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let validator = require("validator");
let findOrCreate = require('mongoose-find-or-create');
let passport = require("passport") ,
  LocalStrategy = require('passport-local').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



const REQUIRED = "{PATH} is required";

let Schema = new mongoose.Schema({
    alias: {type: String, unique: true, required: REQUIRED}
    , profile_img: {
        data: {type: String, required: REQUIRED},
        mimetype: {type: String, required: REQUIRED},
      }
    , admin: { type: Boolean, default: false }
    , isRenter: { type: Boolean, default: false }
    , isHost: { type: Boolean, default: false }
    , isVerified: { type: Boolean, default: false }
    , email: {
      type: String
      , required: REQUIRED
      , unique: true
      , validate: {
        validator: val => validator.isEmail(val)
      , message: "Invalid Email {VALUE}"
    }
  }
  , password: {type: String, required: REQUIRED, select: false}
, first_name: {type: String, required: REQUIRED}
, ssn_encrypted: {type: String}
, stripe_customer_id: {type: String, required: REQUIRED}
, last_name: {type: String, required: REQUIRED}
, phone: {
  type: String
    , required: REQUIRED
    , validate: {
    validator: val => validator.isMobilePhone(val, "en-US")
      , message: "Invalid Phone Number"
  }
}
, address: {type: String, required: REQUIRED}
});

Schema.pre("save", async function(next){
  let doc = this;

  try{
    if(doc.isModified("password")){
      let rounds = 10;
      doc.password = await bcrypt.hash(doc.password, rounds);
    }
  }
  catch(err){
    return next(err);
  }

  next();
});

Schema.statics.authLocal = function (){
  passport.use(new LocalStrategy(
    function(username, password) {
      let _user;

      this.findOne({ username }, function (err, user) {
        if (err) { throw err;}
        if (!user) {
          throw new Error('Incorrect username.');
        }
        if (!user.validPassword(password)) {
          throw new Error('Incorrect password.');
        }
        _user =  user;
      });
    }
  ));
};

Schema.statics.authFacebook = async function () {
  passport.use(new FacebookStrategy({
      clientID: 1097633663710306,
      clientSecret: 'edc22e0ea7e1de98964a35c222191248', // TODO add to .env file
      callbackURL: "http://localhost:8787/auth/facebook/callback" // TODO add to .env file
    },
    function(accessToken, refreshToken, profile) {
      this.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  ));
};

Schema.statics.authGoogle = async function () {
  passport.use(new GoogleStrategy({
      clientID: '146856721457-pv5vmqe1iptmtv0vf416lo5tvl5a0ip6.apps.googleusercontent.com', // TODO add to .env file
      clientSecret: 'u8AWTeoVuwWQh58AxZyAPYmg', // TODO add to .env file
      callbackURL: "http://localhost:8787/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      this.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
    }
  ));

};
exports.User = mongoose.model("User", Schema);