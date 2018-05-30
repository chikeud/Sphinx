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
  isRenter: { type: Boolean, required: REQUIRED},
  isHost: { type: Boolean, required: REQUIRED},
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
  ssn: {type: String},
  stripeId: {type: String},
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
    zip: {type: String, required: REQUIRED},
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

    if(doc.isModified("ssn")){
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

UserSchema.methods.validPass = async function(pass){
  return await bcrypt.compare(pass, this.password);
};

exports.User = mongoose.model("users", UserSchema);