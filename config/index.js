/* eslint-disable no-undef */

/**
 * @author EmmanuelOlaojo
 * @since 11/22/17
 */



const DB_ADDRESS = "mongodb://localhost:27017";
const COLLECTION = process.env.COLLECTION || "Sphinx";

exports.PORT = process.env.PORT || 8787;
exports.SECRET = "secret";
exports.DB_URL = `${DB_ADDRESS}/${COLLECTION}`;
exports.MONGO_ERR = "MongoError";
exports.DUP_ERR = 11000;
exports.AUTH_TOKEN = "x-auth-token";
exports.DEFAULT_ERR_MSG = "OOPS! Sumfin goofed!!";
exports.AUTH_ERR_MSG = "Authentication Failed!";
exports.MAX_PAYLOAD = "50mb";
exports.MIN_PASS_LENGTH = 8;
exports.SMTP = {
  pool: true,
  host: process.env.MAILER_HOST,
  port: process.env.MAILER_PORT,
  auth: {
      user: process.env.MAILER_SMTP_USER,
      pass: process.env.MAILER_SMTP_PASS
  }
};
exports.FACEBOOK_CREDENTIALS = {
  clientID: "2029960987311296",
  clientSecret: "745d0cd27fb78b2d7df9c57d41b139a3",
  callbackURL: "/auth/facebook/callback",
  profileFields: ["email", "first_name", "last_name"],
}

