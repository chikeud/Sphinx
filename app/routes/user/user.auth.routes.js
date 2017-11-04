/**
 *
 * jshint esversion: 6
 * @author ChikeUdenze
 * @since 10/21/17
 */

let express = require("express");

let user = require("./user");
let {checkToken} = require("../../../utils/authToken");
//upload.single('avatar'),

let userRouter = express.Router();
let multer = require('multer');
let upload = multer({ dest: 'uploads/' });

userRouter.route("/")
    .get(checkToken, user.getUser)
    .get(checkToken, user.editUser);

userRouter.get("/all", checkToken, user.getUsers);
userRouter.post("/new",user.createUser);
userRouter.delete("/del", checkToken, user.deleteUser);

module.exports = userRouter;