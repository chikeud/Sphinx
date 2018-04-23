/**
 * @author Chike Udenze
 * @since 4/21/18
 */

let moduleId = "users/user";

let bcrypt = require("bcrypt");

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let User = require("../../models/User").User;
let auth = require("../../../utils/authToken");


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
  const respond = response.success(res);
  const respondErr = response.failure(res, moduleId);
  let user = new User();
  const props = [
    'alias', 'email', 'password', 'first_name', 'last_name', 'phone', 'address', 'isHost', 'isRenter'
  ];

  for(const prop of props){
    user[prop] = req.body[prop];
  }
  // ssn field should me made required for Host for sign-up from the Front End
  if (req.body['isHost']) {
    user['ssn'] = req.body['ssn']
  }

  const noUserExists = ! await User.findOne().exec();

  if(noUserExists){
    user.admin = true;
  }

  try{
    user = await user.save();
    user = user.toObject();
    let token = await auth.createToken(user);

    delete user.password;

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
  const { alias, password } = req.body;

  try{
    const user = await User.findOne({alias}).select("+password").exec();

    if(!user){
      return respondErr(http.BAD_REQUEST, "Incorrect Username");
    }

    const authorized = await bcrypt.compare(password, user.password);

    if(!authorized){
      return respondErr(http.BAD_REQUEST, "Incorrect Password");
    }

    const token = await auth.createToken(user);

    delete user.password;

    respond(http.OK, "Logged In!", {token, user});
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
      'alias', 'email', 'password', 'first_name', 'last_name', 'phone', 'address'
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