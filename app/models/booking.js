
/**
 * @author Chike Udenze
 * @since 04/08/18 MM/DD/YY
 */

let mongoose = require("mongoose");
const ERR_REQUIRED = `required`;
let Schema = mongoose.Schema;

let BookingSchema = new Schema({
  pickup: { type: Schema.Types.ObjectId, ref: "Pickups", required: ERR_REQUIRED }
  , delivery: { type: Schema.Types.ObjectId, ref: "Deliveries", required: ERR_REQUIRED }
  , booking_description: {type: String }
  , size: { type: String, required: ERR_REQUIRED}
  , user: { type: Schema.Types.ObjectId, ref: "Users", required: ERR_REQUIRED }
  , host: { type: Schema.Types.ObjectId, ref: "Hosts", required: ERR_REQUIRED }
  , items: {
    type: [{
      name: { type: String, required: ERR_REQUIRED }
      , description: { type: String, required: true }
    }]
    , required: ERR_REQUIRED
  }
});

exports.Booking = mongoose.model("Booking", BookingSchema);
