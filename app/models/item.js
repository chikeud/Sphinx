/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new mongoose.Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true }
  , description: { type: String, require: true }
  , dimensions: {
    length:{ type: Number }
    ,width:{ type: Number }
    ,height:{ type: Number }
  }
});


exports.Item = mongoose.model("Item", ItemSchema);