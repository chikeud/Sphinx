/**
 * @author ChikeUdenze
 * @since 10/20/17
 */

let moduleId = "routes/api";

let express = require("express");

let response = require("../../utils/response");
let http = require("../../utils/HttpStats");
let userRouter = require("./user.auths.routes");

let apiRouter = express.Router();

apiRouter.use("/u", userRouter);

module.exports = apiRouter;
