/**
 * @author EmmanuelOlaojo
 * @since 6/7/18
 */

let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const REQUIRED = "{PATH} is required";

let MessageSchema = new Schema({
  from: {type: Schema.Types.ObjectId, required: REcQUIRED},
  to: {type: Schema.Types.ObjectID, required: REQUIRED},
  text: {type: String, required: REQUIRED},
  img: {
    id: Schema.types.ObjectID,
    file: {}
  }
}, {timestamps: true});

exports.Message = mongoose.model("messages", MessageSchema);
