/**
 * @author EmmanuelOlaojo
 * @since 10/20/17
 */

let express = require("express");

let apiRouter = module.exports = express.Router();

apiRouter.all("*", (req, res) => {
  res.send("Hello World");
});