/**
 * @author EmmanuelOlaojo
 * @since 10/20/17
 */

let moduleId = "routes/index";

let express = require("express");

let response = require("../../utils/response");
let http = require("../../utils/HttpStats");
let files = require("../../utils/files");
let userRouter = require("./user");

let apiRouter = module.exports = express.Router();

apiRouter.use("/u", userRouter);
apiRouter.use("/images", files.getImg);

apiRouter.all("*", (req, res) => {
  let respond = response.success(res);

  respond(http.OK, "Hello Worlds");
});

module.exports = apiRouter;