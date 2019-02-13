/**
 * @author Emmanuel Olaojo
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

let config = require("../../config");

const REQUIRED = "{PATH} is required";
let Schema = mongoose.Schema;

let UserSchema = new Schema({
  alias: {type: String, unique: true, required: REQUIRED},
  profileImg: {
    id: Schema.Types.ObjectId,
    file: {}
  },
  admin: { type: Boolean, default: false },
  isHost: { type: Boolean, required: REQUIRED},
  isRenter: { type: Boolean, required: REQUIRED},
  isVerified: { type: Boolean, default: false },
  email: {
    type: String,
    required: REQUIRED,
    unique: true,
    validate: {
      validator: val => validator.isEmail(val),
      message: "Invalid Email {VALUE}"
    }
  },
  password: {
    type: String,
    required: REQUIRED,
    select: false,
    minlength: config.MIN_PASS_LENGTH
  },
  firstName: {type: String, required: REQUIRED},
  lastName: {type: String, required: REQUIRED},
  ssn: String,
  stripeId: {type: String},
  facebookId: {type: String},
  googleId: {type: String},
  phone: {
    type: String,
    required: REQUIRED,
    validate: {
      validator: val => validator.isMobilePhone(val, "en-US"),
      message: "Invalid Phone Number",
    }
  },
  address: {
    city: {type: String, required: REQUIRED},
    state: {type: String, required: REQUIRED},
    zip: {
      type: String,
      required: REQUIRED,
      validate: {
        validator: val => isValidUSZip(val),
        message: "Invalid Zip {VALUE}"
      }
    },
    street: {type: String, required: REQUIRED},
    houseNum: {type: String}
  }
});

UserSchema.pre("save", async function(next){
  let doc = this;

  try{
    let rounds = 10;

    if(doc.isModified("password")){
      doc.password = await bcrypt.hash(doc.password, rounds);
    }

    if(doc.ssn && doc.isModified("ssn")){
      if(!isValidSSN(doc.ssn)){
        return next(new Error("Invalid SSN!"));
      }

      doc.ssn = await bcrypt.hash(doc.ssn, rounds);
    }

    if(doc.isHost && !doc.ssn){
      next(new Error("SSN required for host!"));
    }
  }
  catch(err){
    return next(err);
  }

  next();
});

/**
 * Checks if a string is a valid US
 * zip code
 *
 * @param zip zip code
 *
 * @returns {boolean}
 */
function isValidUSZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip);
}

/**
 * Checks if a string is a valid ssn
 *
 * @param ssn string to check
 *
 * @returns {boolean}
 */
function isValidSSN(ssn) {
  return /^\d{3}-?\d{2}-?\d{4}$/.test(ssn);
}

UserSchema.methods.validPass = async function(pass){
  return await bcrypt.compare(pass, this.password);
};

exports.User = mongoose.model("users", UserSchema);