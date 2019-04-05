/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const REQUIRED = "{PATH} is required";

let MessageSchema = new Schema({
  from: {type: Schema.ObjectId, ref: "users", required: REQUIRED},
  to: {type: Schema.ObjectId, ref: "users", required: REQUIRED},
  text: {type: String},
  images: [{
    id: Schema.ObjectId,
    file: {}
  }]
}, {timestamps: true});

/**
 * Validate text and image fields before save
 */
MessageSchema.pre("save", function(next){
  let msg = this;

  if(msg.text || (msg.images && msg.images.length)){
    return next();
  }

  next(new Error("Image or Text must be present in message!"));
});

exports.Message = mongoose.model("Messages", MessageSchema);
