/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const REQUIRED = "{PATH} is required";

let MessageSchema = new Schema({
  from: {type: Schema.ObjectId, required: REQUIRED},
  to: {type: Schema.ObjectId, required: REQUIRED},
  text: {type: String, required: REQUIRED},
  img: {
    id: Schema.ObjectId,
    file: {}
  }
}, {timestamps: true});

exports.Message = mongoose.model("messages", MessageSchema);
