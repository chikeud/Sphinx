/**
 * @author EmmanuelOlaojo
 * @since 10/21/17
 */

let express = require("express");

let user = require("./user");
let auth = require("../../../utils/authToken");
let userRouter = express.Router();


userRouter.route("/")
  .post(user.createUser)
  .put(auth.checkToken, user.editUser)
  .get(auth.checkToken, user.getUser);


module.exports = userRouter;