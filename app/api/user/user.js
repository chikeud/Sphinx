/**
 * @author EmmanuelOlaojo
 * @author Chike Udenze
 * @author King David Lawrence
 * @since 4/21/18
 */

let moduleId = "users/user";

let bcrypt = require("bcrypt");
let mongoose = require("mongoose");
let Grid = require("gridfs-stream");

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let User = require("../../models/user").User;
let auth = require("../../../utils/authToken");
let files = require("../../../utils/files");

Grid.mongo = mongoose.mongo;

/**
 * Route handler to get users
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.getUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let _id = req.query.id || req.user._id;

  try{
    let user = await User.findById(_id);

    if(user) return respond(http.OK, "User Found!", {user});
    respond(http.OK, "User Not Found");
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

/**
 * Route handler to create a user
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.createUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let user = new User();
  let props = [
    "alias",
    "email",
    "password",
    "firstName",
    "lastName",
    "phone",
    "isRenter",
    "isHost",
    "address",
    "ssn"
  ];

  for(let prop of props){
    user[prop] = req.body[prop];
  }

  // ssn field should me made required for Host
  if (user.isHost && !user.ssn) {
    console.log(user);
    return respondErr(http.BAD_REQUEST, "Missing Host SSN!");
  }

  try{
    user = await user.save();

    user = user.toObject();
    let token = await auth.createToken(user);

    respond(http.CREATED, "User Created", {user, token});
  }
  catch(err){
    console.log(err);
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};

/**
 * Login route handler
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.login = async (req, res) => {
  const respond = response.success(res);
  const respondErr = response.failure(res, moduleId);
  let {alias, password} = req.body;
  let fail = () => respondErr(http.UNAUTHORIZED, "Invalid User");

  try{
    let user = await User.findOne({alias}).exec();
    if(!user) return fail();

    let validPass = await bcrypt.compare(password, user.password);
    if(!validPass) return fail();

    let token = await auth.createToken(user);
    return respond(http.OK, "Logged In!", {token});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

/**
 * Route handler to edit user
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.editUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let user;

  try{
    user = req.user;

    let props = [
      "password", "firstName", "lastName", "phone",
      "isHost", "isRenter",  "address", "ssn"
    ];

    let uniques = [
      "alias", "email"
    ];

    let query = {};
    for (let unique of uniques ) {
      if (req.body[unique]) {
        query[unique] = req.body[unique];
        let exists = await User.findOne(query).exec();
        if (!exists) {
          user[unique] = req.body[unique];
        }
        else {
          return unique === "alias" ? respondErr(http.BAD_REQUEST, "username already exists!") :
            respondErr(http.BAD_REQUEST, req.body[unique] + " already exists!");
        }
      }
    }

    for(let prop of props){
      if(req.body[prop] !== null && req.body[prop] !== undefined){
        user[prop] = req.body[prop];
      }
    }

    user = await user.save();

    console.log(user);

    respond(http.OK, "User Edited", {user});
  }
  catch(err){
    console.log(err);
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};

/**
 * Sets the profile image for a
 * logged in user.
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<*>}
 */
exports.setProfileImg = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let conn = mongoose.connection;
  let gfs = Grid(conn.db);
  let removeFile = Promise.promisify(gfs.remove);

  try{
    let result = await files.uploadImage(req.file);
    let user = req.user;

    console.log(result);

    if(!result){
      return respondErr(http.BAD_REQUEST, "Invalid Image");
    }

    // remove pre-existing profile image
    if(user.profileImg && user.profileImg.id){
      await removeFile({_id: user.profileImg.id});
    }

    user.profileImg.file = result;
    user.profileImg.id = result._id;

    user = await user.save();

    respond(http.CREATED, "Profile Image saved", {user});
  }
  catch(err){
    throw err;
  }
};
