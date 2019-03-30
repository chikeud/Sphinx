/**
 * @dejijaye
 */

let moduleId = "item/item";

let bcrypt = require("bcrypt");
let mongoose = require("mongoose");
let Grid = require("gridfs-stream");

let response = require("../../../utils/response");
let http = require("../../../utils/HttpStats");
let User = require("../../models/user").User;
let Item = require("../../models/item").Item;
let auth = require("../../../utils/authToken");
// let files = require("../../../utils/files");

/**
 * Route handler to create an item
 *
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */
exports.createItem = (req, res) => {
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

exports.findOne = async (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let owner = req.user._id;

  if(!req.user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');

  try {
    let item = await Item.findOne({_id: req.params.id}).exec();
    if(item) respond(http.OK, 'Item successfully fetched', item);
    else return respond(http.OK, 'No item found');
  } catch(err) {
    console.log(err);
    respondErr(http.BAD_REQUEST, 'Error fetching item', err);
  }
}

exports.edit = (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  let update = {name, description} = req.body;

  if(!req.user) respondErr(http.UNAUTHORIZED, 'You need to sign in to continue');


  Item.findOneAndUpdate({_id: req.params.id}, update, (err, item) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error updating item', err);
    else respond(http.OK, 'Item successfully updated');
  })
}

exports.delete = (req, res) => {
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);


  Item.deleteOne({_id: req.params.id}, (err, _) => {
    if(err) respondErr(http.BAD_REQUEST, 'Error deleting item', err);
    else respond(http.OK, 'Item successfully deleted');
  })
  
}