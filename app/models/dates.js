/**
 * @author Emmanuel Olaojo
 * @since 12/3/17
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

exports.Pickup = mongoose.model("pickups", PickupDateSchema);
exports.Delivery = mongoose.model("deliveries", DeliveryDateSchema);
