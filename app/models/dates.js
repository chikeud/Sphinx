/**
 * @author Emmanuel Olaojo
 * @since 04/08/18 MM/DD/YY
 */

let mongoose = require("mongoose");

let PickupDateSchema = new mongoose.Schema({
  date: {type: String, required: true}
  , taken: {type: Boolean, default: false}
});

let DeliveryDateSchema = new mongoose.Schema({
  date: {type: String, required: true}
  , taken: {type: Boolean, default: false}
});

exports.Pickup = mongoose.model("Pickups", PickupDateSchema);
exports.Delivery = mongoose.model("Deliveries", DeliveryDateSchema);