/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let validator = require("validator");


const REQUIRED = "{PATH} is required";

let Schema = new mongoose.Schema({
  alias: {type: String, unique: true, required: REQUIRED}
  , profile_img: {
    data: {type: String, required: REQUIRED},
    mimetype: {type: String, required: REQUIRED},
  }
  , admin: { type: Boolean, default: false }
  , isRenter: { type: Boolean, default: false }
  , isHost: { type: Boolean, default: false }
  , isVerified: { type: Boolean, default: false }
  , email: {
    type: String
    , required: REQUIRED
    , unique: true
    , validate: {
      validator: val => validator.isEmail(val)
      , message: "Invalid Email {VALUE}"
    }
  }
  , password: {type: String, required: REQUIRED, select: false}
  , first_name: {type: String, required: REQUIRED}
  , ssn_encrypted: {type: String}
  , stripe_customer_id: {type: String, required: REQUIRED}
  , last_name: {type: String, required: REQUIRED}
  , phone: {
    type: String
    , required: REQUIRED
    , validate: {
      validator: val => validator.isMobilePhone(val, "en-US")
      , message: "Invalid Phone Number"
    }
  }
  , address: {type: String, required: REQUIRED}
});

Schema.pre("save", async function(next){
  let doc = this;

  try{
    if(doc.isModified("password")){
      let rounds = 10;
      doc.password = await bcrypt.hash(doc.password, rounds);
    }
  }
  catch(err){
    return next(err);
  }

  next();
});

exports.User = mongoose.model("User", Schema);