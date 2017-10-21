/**
 * @author EmmanuelOlaojo
 * @since 10/20/17
 */

let moduleId = "routes/index";

let express = require("express");
let response = require("../../utils/response");
let http = require("../../utils/HttpStats");

let apiRouter = module.exports = express.Router();

apiRouter.all("*", (req, res) => {
  let respond = response.success(res);

  respond(http.OK, "Hello World");
});