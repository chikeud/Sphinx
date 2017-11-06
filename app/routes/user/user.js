/**
 * @author EmmanuelOlaojo
 * @author Chike Udenze
 * @since 10/21/17
 */
let moduleId = "routes/user/user";
let response = require("../../../utils/response");
let User = require("../../models/UserModel").User;
let {createToken} = require("../../../utils/authToken");
let multer = require('multer');
let Grid = require('gridfs');
let config = require("../../../config/index");
let http = require("../../../utils/HttpStats");

/**
 * Creates a User and returns a jwt in the response
 *
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */
exports.createUser = async function (req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let user = new User();

  //name, home address,DOB, ssn, photo
  let userProps = [
    "_id"
    ,"alias"
    ,"firstName"
    ,"lastName"
    ,"email"
    ,"password"
    ,"address"
    ,"ssn"
    ,"isRenter"
  ];

  for(let prop of userProps){
    user[prop] = req.body[prop];
  }

  try{
    user = await user.save();
    user = user.toObject();
    delete user.password;

    let token = await createToken(user);

    respond(http.CREATED, "User Created", {user,token});
  }
  catch(err){
    respondErr(http.BAD_REQUEST,err.message,err);
  }
};
