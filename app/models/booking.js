/**
 * @author Chike Udenze
 * @since 04/08/2018
 */

let mongoose = require("mongoose");
const ERR_REQUIRED = `required`;
let Schema = mongoose.Schema;

let BookingSchema = new Schema({
  pickup: {type: Schema.Types.ObjectId, ref: "pickups", required: ERR_REQUIRED}
  , delivery: {type: Schema.Types.ObjectId, ref: "deliveries", required: ERR_REQUIRED}
  , size: {type:String, required: ERR_REQUIRED}
  , user: {type: Schema.Types.ObjectId, ref: "users", required: ERR_REQUIRED}
  , items: {
    type: [{
      name: {type: String, required: ERR_REQUIRED}
      , description: {type: String, required: true}
    }]
    , required: ERR_REQUIRED
  }
});

exports.Booking = mongoose.model("Booking", BookingSchema);
