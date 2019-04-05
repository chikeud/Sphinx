/**
 * @dejijaye
 */

let moduleId = "booking/bookng";

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Listing = require("../../models/listing").Listing;
let Booking = require('../../models/booking').Booking;
// let auth = require("../../../utils/authToken");

/**
 * Route handler to create an booking
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.create = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let user = req.user._id;
  let listingId = req.params.id;
  let {pickup, delivery, description, size} = req.body;

  if(!req.user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');

  let booking = new Booking({
    pickup, delivery, description, size, user, listing: listingId
  });
  try {
    let listing = await Listing.findOne({_id: listingId}).exec();
    // should not allow users to book their own listings
    if(listing.owner.toString() === user.toString()) return respondErr(http.UNAUTHORIZED, 'Booking not allowed');
    await booking.save()
    return respond(http.CREATED, 'Booking successfully created', booking);
  } catch(err) {
    return respondErr(http.SERVER_ERROR, 'Something went wrong', err);
  }
}

/**
 * Route handler to get all a user bookings
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.findAll = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let user = req.user._id;

  if(!req.user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');

  try {
    let bookings = await Booking.find({user: user});
    if(bookings.length > 0) respond(http.OK, 'Bookings successfully fetched', bookings);
    else return respond(http.OK, 'No booking found');
  } catch(err) {
    respondErr(http.BAD_REQUEST, 'Error fetching bookings', err);
  }
}

/**
 * Route handler to get a single booking
 *
 * @param req request
 * @param res response
 * @param id query params
 *
 * @returns {Promise.<void>}
 */
exports.findOne = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  try {
    let booking = await Booking.findOne({_id: req.params.id}).exec();
    if(booking) respond(http.OK, 'Booking successfully fetched', booking);
    else return respond(http.OK, 'No booking found');
  } catch(err) {
    console.log(err);
    respondErr(http.BAD_REQUEST, 'Error fetching booking', err);
  }
}

/**
 * Route handler to edit a user booking
 *
 * @param req request
 * @param res response
 * @param id query params
 *
 * @returns {Promise.<void>}
 */
exports.edit = (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let update = {pickup, delivery, description} = req.body;

  Booking.findOneAndUpdate({_id: req.params.id}, update, (err, booking) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error updating booking', err);
    else respond(http.OK, 'Booking successfully updated');
  })
}

/**
 * Route handler to delete a user listing
 *
 * @param req request
 * @param res response
 * @param id query params
 *
 * @returns {Promise.<void>}
 */
exports.delete = (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);

  Booking.deleteOne({_id: req.params.id}, (err, _) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error deleting booking', err);
    else respond(http.OK, 'Booking successfully deleted');
  })  
}

exports.hasAuthorization = async (req, res, next) => {
  let respondErr = response.failure(res, moduleId);
  let user = req.user;
  if(!user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');
  try {
    let booking = await Booking.findOne({_id: req.params.id}).exec();
    if(user._id.toString() === booking.user.toString()) next();
    else return respondErr(http.UNAUTHORIZED, 'User is unauthorized')
  } catch (err) {
    return respondErr(http.SERVER_ERROR, 'Something went wrong.')
  } 
}
