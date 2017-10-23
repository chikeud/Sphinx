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
 */

exports.createUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  //name, home address,DOB, ssn, photo
  let userProps = ["alias","firstName","lastName","email","password","address", "ssn","isRenter"];
  let user = new User();
  for(let prop of userProps){
    user[prop] = req.body[prop];
  }
};