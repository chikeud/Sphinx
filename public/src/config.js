/**
 * @author EmmanuelOlaojo
 * @since 5/29/18
 */

let config = require("../../config");

export default{
  AUTH_TOKEN: config.AUTH_TOKEN,
  MIN_PASS_LENGTH: config.MIN_PASS_LENGTH,
  AUTH: "auth",
  USER: "user",
};
