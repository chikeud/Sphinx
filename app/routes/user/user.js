/**
 *
 * @author Chike Udenze
 * @since 4/21/18
 */

let moduleId = "users/user";

let bcrypt = require("bcrypt");
let Fawn = require("fawn");
let mongoose = require("mongoose");
let Grid = require("gridfs-stream");
let fs = Promise.promisifyAll(require("fs"));

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let User = require("../../models/User").User;
let auth = require("../../../utils/authToken");

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
    "isHost",
    "isRenter",
    "address"
  ];

  for(let prop of props){
    user[prop] = req.body[prop];
  }

  // ssn field should me made required for Host
  if (user.isHost && !user.ssn) {
    return respondErr(http.BAD_REQUEST, "Missing Host SSN!");
  }

  try{
    if(req.file){
      let fileId = mongoose.Types.ObjectId();
      let task = Fawn.Task();

      user.profileImg = fileId;

      let result = await task
        .saveFile(req.file.path, {_id: fileId})
        .save(user)
        .run({useMongoose: true});

      await fs.unlinkAsync(req.file.path);

      user = result[1];
    }
    else {user = await user.save();}

    user = user.toObject();
    let token = await auth.createToken(user);

    // delete user.password;

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

  try{
    let user = req.user;
    let props = [
      "alias", "email", "password", "first_name", "last_name", "phone", "address"
    ];

    for(let prop of props){
      if(req.body[prop]){
        user[prop] = req.body[prop];
      }
    }

    user = await user.save();

    respond(http.OK, "User Edited", {user});
  }
  catch(err){
    respondErr(http.BAD_REQUEST, err.message, err);
  }
};
