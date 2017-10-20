/**
 * @author EmmanuelOlaojo
 * @since 7/13/17
 */

module.exports = {
  port: process.env.PORT || 8787
  , secret: 'issadatabase'
  , url: 'mongodb://localhost:27017/StorDB'
  , MONGO_ERR: "MongoError"
  , DUP_ERR: 11000
  , authToken: "x-u_auth-token"
  , DEFAULT_ERR_MSG: "OOPS!! Sumfin goofed!!"
};