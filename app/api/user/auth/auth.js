/**
 * @author Chike Udenze
 * @since 12/30/18
 */

let passport = require("passport");
let Facebook = require("passport-facebook");
let Google = require("passport-google-oauth").OAuth2Strategy;

let User = require("../../../models/user").User;
let auth = require("../../../../utils/authToken");
let social = require("./social");

/**
 * Finds or creates a user that matches
 * the social profile.
 *
 * @param profile - user's profile
 * @return {Promise<*>}
 */
async function getUser(profile){
  console.log(profile);
  let id = profile.id;
  let user;

  try{
    user = await User.findOne({$or: [{ facebookId: id }, { googleId: id }]});


    if(!user){
      return null;
    }
    return user;
  }
  catch (err) {
    throw err;
  }
}

/**
 * Passport configuration callback.
 *
 * @param accessToken - api accessToken
 * @param refreshToken - can be used to refresh accessToken
 * @param profile - user's profile
 * @param done - callback function
 *
 * @return {Promise<void>}
 */
async function passportAuth(accessToken, refreshToken, profile, done) {
  console.log(profile);
  try{
    let user = await getUser(profile);

    if(user !== null){
      done(null, user);
    }

    else{
      done(null, false,  { message: 'No user found' });
    }

  }
  catch (err) {
    done(err);
  }
}

/**
 * Assigns a token to the user by
 * setting a cookie in the response.
 * Redirects to home.
 *
 * @param req request
 * @param res response
 *
 * @return {Promise<void>}
 */
exports.grantToken = async function (req, res) {
  try{
    let token = await auth.createToken(req.user);

    res.cookie("token", token);
    res.redirect("/");
  }
  catch (err) {
    console.log(err);
    res.redirect("/");
  }
};

/**
 * Configure passport.
 */
exports.setup = function(){
  passport.use(new Facebook(social.facebook, passportAuth));
  passport.use(new Google(social.google, (accessToken, refreshToken, profile, done) => {
    console.log(profile.id);
    done(null, false);
  }));
};