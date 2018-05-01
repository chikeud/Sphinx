/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */

const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({
  name: { type: String, required: true }
  , description: { type: Boolean, default: false }
  , dimensions: {
    length:{ type: Number }
    ,width:{ type: Number }
    ,height:{ type: Number }
  }
});


exports.Item = mongoose.model("Item", ItemSchema);