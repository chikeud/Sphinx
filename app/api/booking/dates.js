/**
 * @author EmmanuelOlaojo
 * @since 12/3/17
 */

let moduleId = "/booking/dates";

let {Pickup, Delivery} = require("../../models/Dates");
let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");

exports.getDates = async(req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  try{
    let pickup = await Pickup.find({taken: false}).exec();
    let delivery = await Delivery.find({taken: false}).exec();

    respond(http.OK, "These be the dates", {pickup, delivery});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};

