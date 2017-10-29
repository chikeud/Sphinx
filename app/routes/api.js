/**
 * @author EmmanuelOlaojo
 * @since 10/20/17
 */

let moduleId = "routes/api";

let express = require("express");

let response = require("../../utils/response");
let http = require("../../utils/HttpStats");
let userRouter = require("./user");

let apiRouter = module.exports = express.Router();

apiRouter.use("/u", userRouter);

apiRouter.all("*", (req, res) => {
  let respond = response.success(res);

  respond(http.OK, "Hello World");
});
