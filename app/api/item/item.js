/**
 * @dejijaye
 */

let moduleId = "item/item";

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let Item = require("../../models/item").Item;


/**
 * Route handler to create an item
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

  let item = new Item({
    name, description, dimension, owner
  });

  item.save(err => {
    if(err) respondErr(http.BAD_REQUEST, 'Error saving item', err);
    else respond(http.CREATED, 'Item successfully created', item);
  });

}

/**
 * Route handler to get all a user's items
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
    let items = await Item.find({owner: owner});
    if(items.length > 0) respond(http.OK, 'Items successfully fetched', items);
    else return respond(http.OK, 'No item found');

  } catch(err) {
    respondErr(http.BAD_REQUEST, 'Error fetching items', err);
  }
}

/**
 * Route handler to get a single item
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
    let item = await Item.findOne({_id: req.params.id}).exec();
    if(item) respond(http.OK, 'Item successfully fetched', item);
    else return respond(http.OK, 'No item found');
  } catch(err) {
    console.log(err);
    respondErr(http.BAD_REQUEST, 'Error fetching item', err);
  }
}

/**
 * Route handler to edit a user item
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

  Item.findOneAndUpdate({_id: req.params.id}, update, (err) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error updating item', err);
    else respond(http.OK, 'Item successfully updated');
  })
}

/**
 * Route handler to delete a user item
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
  
  Item.deleteOne({_id: req.params.id}, (err, _) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error deleting item', err);
    else respond(http.OK, 'Item successfully deleted');
  })  
}

exports.hasAuthorization = async (req, res, next) => {
  let respondErr = response.failure(res, moduleId);
  let user = req.user;
  if(!user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');
  try {
    let item = await Item.findOne({_id: req.params.id}).exec();
    if(user._id.toString() === item.owner.toString()) next();
    else return respondErr(http.UNAUTHORIZED, 'User is unauthorized')
  } catch (err) {
    return respondErr(http.SERVER_ERROR, 'Something went wrong.')
  } 
}
