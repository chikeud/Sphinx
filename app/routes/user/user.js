/**
 * @author EmmanuelOlaojo
 * @since 10/21/17
 */
let moduleId = "routes/user/user";
let response = require("../../../utils/response");

/**
 * Creates a User and returns a jwt in the response
 *
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */

exports.createUser = async function (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  //name, home address,DOB, ssn, photo
  let userProps = ["alias","firstName","lastName","email","password","address", "ssn","isRenter"];
  let user = new User();
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
    let msg = err.code === config.DUP_ERR ? "Given alias has been taken" : err.msg;
  }
};