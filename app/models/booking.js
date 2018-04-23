
/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */

let mongoose = require("mongoose");
const ERR_REQUIRED = `required`;
let Schema = mongoose.Schema;

let BookingSchema = new Schema({
  pickup: { type: Date, required: ERR_REQUIRED }
  , delivery: { type: Date, required: ERR_REQUIRED }
  , booking_description: {type: String }
  , size: { type: String, required: ERR_REQUIRED}
  , user: { type: Schema.Types.ObjectId, ref: "Users", required: ERR_REQUIRED }
  , host: { type: Schema.Types.ObjectId, ref: "Hosts", required: ERR_REQUIRED }
  , items: {
    type: [{
      item: { type: Schema.Types.ObjectId, ref: "Item", required: ERR_REQUIRED }
    }]
    , required: ERR_REQUIRED
  }
});

exports.Booking = mongoose.model("Booking", BookingSchema);
