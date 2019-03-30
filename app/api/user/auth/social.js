/**
 * @author Chike Udenze
 * @since 1/1/19
 */

// Facebook credentials
exports.facebook = {
  clientID: "2029960987311296",
  clientSecret: "745d0cd27fb78b2d7df9c57d41b139a3",
  callbackURL: "/api/user/auth/facebook/callback",
  profileFields: ["email", "first_name", "last_name"],
};


// Google credentials
exports.google = {
  clientID: "146856721457-pv5vmqe1iptmtv0vf416lo5tvl5a0ip6.apps.googleusercontent.com",
  clientSecret: "u8AWTeoVuwWQh58AxZyAPYmg",
  callbackURL: "/api/user/auth/google/callback"
};

/**
 * Gets the first and last name from
 * a user's profile.
 *
 * @param profile - user's profile
 * @return {{firstName: *, lastName: *}}
 */
exports.getName = function(profile) {
  let firstName, lastName;

  if (profile.name){
    firstName = profile.name.givenName;
    lastName = profile.name.familyName;
  }
  else{
    let names = profile.displayName.split(" ");
    firstName = names[0];
    lastName = names[1];
  }

  return {firstName, lastName}
};

