/**
 * @author EmmanuelOlaojo
 * @since 10/21/17
 */
let moduleId = "routes/user/user";
let response = require("../../../utils/response");

exports.createUser = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
};