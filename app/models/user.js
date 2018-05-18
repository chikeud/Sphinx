/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */
let mongoose = require("mongoose");
let bcrypt = require("bcrypt");
let validator = require("validator");
// let findOrCreate = require("mongoose-find-or-create");

const REQUIRED = "{PATH} is required";

let Schema = new mongoose.Schema({
  alias: {type: String, unique: true, required: REQUIRED},
  profileImg: {type: Schema.Types.ObjectId},
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
  password: {type: String, required: REQUIRED, select: false},
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
  address: {type: String, required: REQUIRED}
});

Schema.pre("save", async function(next){
  let doc = this;

  try{
    let rounds = 10;

    if(doc.isModified("password")){
      doc.password = await bcrypt.hash(doc.password, rounds);
    }

    if(doc.isModified("ssn")){
      doc.ssn = await bcrypt.hash(doc.ssn, rounds);
    }
  }
  catch(err){
    return next(err);
  }

  next();
});

Schema.methods.validPass = async function(pass){
  return await bcrypt.compare(pass, this.password);
};

exports.User = mongoose.model("User", Schema);