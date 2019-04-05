
/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */

const mongoose = require("mongoose");
const ERR_REQUIRED = `required`;
const Schema = mongoose.Schema;

let BookingSchema = new Schema({
  pickup: { type: Date, required: ERR_REQUIRED }
  , delivery: { type: Date, required: ERR_REQUIRED }
  , description: {type: String}
  , size: { type: String, required: ERR_REQUIRED}
  , user: { type: Schema.Types.ObjectId, ref: "Users", required: ERR_REQUIRED }
  , item: { type: Schema.Types.ObjectId, ref: "Item", required: ERR_REQUIRED }
});

exports.Booking = mongoose.model("Booking", BookingSchema);
