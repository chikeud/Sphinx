/**
 * @author EmmanuelOlaojo
 * @author Chike Udenze
 * @since 10/21/17
 */
let moduleId = "routes/user/user";
let response = require("../../../utils/response");
let User = require("../../models/UserModel").User;

/**
 * Creates a User and returns a jwt in the response
 *
 * @param req request
 * @param res response
 * @returns {Promise.<void>}
 */

exports.createUser = async function (req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res, moduleId);
  //name, home address,DOB, ssn, photo
  let userProps = ["alias","firstName","lastName","email","password","address", "ssn","isRenter"];
  let user = new User();
  for(let prop of userProps){
    user[prop] = req.body[prop];
  }
  try{
    addImage(req,user);
    user = await user.save();
    user = user.toObject();
    delete user.password;

    let token = await createToken(user);

    respond(http.CREATED, "User Created", {user,token});
  }
  catch(err){
    let msg = err.code === config.DUP_ERR ? "Given alias has been taken" : err.msg;
    respondErr(http.BAD_REQUEST,msg,err);
  }
};

/**
 * Get a user with a given id or alias. If those aren't provided,
 * return the logged in user
 * @param req request
 * @param res response
 * @returns {Promise.<*>}
 */
exports.getUser = async function(req,res){
  let respond = response.success(res);
  let respondErr = response.failure(res,moduleId);
  let find;

  if(req.query._id || req.query.alias){
    let {_id, alias} = req.query;
    find = User.findOne(_id ? {_id} : {alias});
  }
  else{
    find = User.findById(req.user._id);
  }
  try{
    let user = await find.exec();
    if(!user){
      return respondErr(http.NOT_FOUND, "User not found");
    }
    respond(http.OK, "User found", {user});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message,err);
  }
};
/**
 * gets all users
 * @param req request
 * @param res response
 *
 * @returns {Promise.<void>}
 */

exports.getUsers = async function(req, res){
  let respond = respond.success(res);
  let respondErr = response.failure(res,moduleId);

  try{
    let users = await User.find().exec();
    respond(http.OK, "All Users", {users});
  }
  catch(err){
    respondErr(http.SERVER_ERROR, err.message, err);
  }
};
/**
 * Changes user details
 * @param req request
 * @param res response
 */
exports.editUser = async function(req, res){
  let respond = response.success(res);
  let respondErr = response.failure(res,moduleId);
  let userProps = ["alias","firstName","lastName","email","password","address", "ssn","isRenter"];

  try{
    let user = await User.findById(req.user).exec();

    for(let prop of userProps){
      if(req.body[prop]) user[prop] = req.body[prop];
    }
    user = await user.save();

    respond(http.OK, "User edited successfully", {user});
  }
  catch(err){
    respondErr(hrrp.SERVER_ERROR, err.message, err);
  }
};
/**
 * deletes logged in user
 * @returns {Promise.<void>}
 * @param req requests
 * @param res response
 */
 exports.deleteUser = async function(req,res){
   let respond = response.success(res);
   let respondErr = response.failure(res, moduleId);

   let query = User.findOneAndRemove({_id: req.user._id});

   try{
     let  user = await query.exec();

     if(!user){
       return respondErr(http.NOT_FOUND, "User not found");
     }

     respond(http.OK, "User Deleted Successfully", {user});
   }
   catch(err){
     respondErr(http.SERVER_ERROR,err.message,err)
   }

 };
 exports.addImage = async