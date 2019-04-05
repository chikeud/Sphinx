/**
 * @dejijaye
 */

let moduleId = "listing/listing";

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Listing = require("../../models/listing").Listing;


/**
 * Route handler to create an listing
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.create = (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let owner = req.user._id;
  let {name, description, dimension} = req.body

  if(!req.user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');

  let listing = new Listing({
    name, description, dimension, owner
  });

  listing.save(err => {
    if(err) respondErr(http.BAD_REQUEST, 'Error saving listing', err);
    else respond(http.CREATED, 'listing successfully created', listing);
  });

}

/**
 * Route handler to get all a user's listings
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.findAll = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let owner = req.user._id;

  if(!req.user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');

  try{
    let listings = await Listing.find({owner: owner});
    if(listings.length > 0) respond(http.OK, 'Listings successfully fetched', listings);
    else return respond(http.OK, 'No listing found');

  } catch(err) {
    respondErr(http.BAD_REQUEST, 'Error fetching listings', err);
  }
}

/**
 * Route handler to get a single listing
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
    let listing = await Listing.findOne({_id: req.params.id}).exec();
    if(listing) respond(http.OK, 'Listing successfully fetched', listing);
    else return respond(http.OK, 'No listing found');
  } catch(err) {
    console.log(err);
    respondErr(http.BAD_REQUEST, 'Error fetching listing', err);
  }
}

/**
 * Route handler to edit a user listing
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
  let update = {name, description} = req.body;

  Listing.findOneAndUpdate({_id: req.params.id}, update, (err) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error updating listing', err);
    else respond(http.OK, 'Listing successfully updated');
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
  
  Listing.deleteOne({_id: req.params.id}, (err, _) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error deleting listing', err);
    else respond(http.OK, 'listing successfully deleted');
  })  
}

exports.hasAuthorization = async (req, res, next) => {
  let respondErr = response.failure(res, moduleId);
  let user = req.user;
  if(!user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');
  try {
    let listing = await Listing.findOne({_id: req.params.id}).exec();
    if(user._id.toString() === listing.owner.toString()) next();
    else return respondErr(http.UNAUTHORIZED, 'User is unauthorized')
  } catch (err) {
    return respondErr(http.SERVER_ERROR, 'Something went wrong.')
  } 
}
