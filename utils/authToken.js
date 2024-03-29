/**
 * @author EmmanuelOlaojo
 * @since 1/3/17
 */

let Promise = require("bluebird");
let jwt = Promise.promisifyAll(require("jsonwebtoken"));

let config = require("../config");
let response = require("./response");
let http = require("./HttpStats");
let Users = require("../app/models/user").User;

let moduleId = "utils/authToken";

/**
 * Validates an authentication token
 * @type {function(*=)}
 */
let validateToken = exports.validateToken = async (token) => {

  if(!token) return false;

  try {
    let user = await jwt.verifyAsync(token, config.SECRET);

    user = await Users.findById(user._id);

    return user;
  }
  catch(err){
    throw err;
  }
};

/**
 * Checks that a user has a valid token
 * i.e. is logged in
 *
 * @param req request
 * @param res response
 * @param next next middleware
 *
 * @returns {Promise.<*>}
 */
exports.checkToken = async (req, res, next) => {
  let respondErr = response.failure(res, moduleId);
  let authToken = req.get(config.AUTH_TOKEN);
  let fail = () => respondErr(http.UNAUTHORIZED, config.AUTH_ERR_MSG);

  if(!authToken) return fail();

  try {
    req.user = await validateToken(authToken);

    if(!req.user) return fail();

    next();
  }
  catch(err){
    respondErr(http.UNAUTHORIZED, config.AUTH_ERR_MSG, err);
  }
};

exports.checkAdmin = (req, res, next) => {
  let respondErr = response.failure(res, moduleId);
  let user = req.user;

  if(!user.admin){
    return respondErr(http.UNAUTHORIZED, config.AUTH_ERR_MSG);
  }

  next();
};

/**
 * Creates a token from a users's details
 *
 * @param user the user
 *
 * @returns {Promise.<*>}
 */
exports.createToken = async (user) => {
  let {_id, alias} = user;

  return await jwt.signAsync({_id, alias}, config.SECRET, {expiresIn: "168h"});
};

(async () => {
  let t1 = await exports.createToken({_id: "5b2fc4f33141e90307ed83ec", alias: "dtiggy"});
  let t2 = await exports.createToken({_id: "5b2fc55f3141e90307ed83f1", alias: "e-oj"});

  console.log("dtiggy", t1, "\n");
  console.log("e-oj", t2);
})();
