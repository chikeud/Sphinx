/**
 * Created by ChikeUdenze on 10/21/17.
 * @since 10/21/17
 */

let validator = require("validator");
let bcrypt = require("bcrypt");
let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    alias: {type: String, required: true, unique: true, minlength: 2, maxlength: 15}
    ,firstName: {type: String, required: true}
    ,lastName: {type: String, required: true}
    ,email: {type: String, required: true
        , validate: {
            isAsync: false
            ,validator: validator.isEmail
            ,message: "Invalid email"
        }
    }
    ,password: {type: String,required: true, minlength: 6, select: false}
    ,isRenter: {type: Boolean, required: true, default: false}
    ,ssn: {type: String, required: false}
});

UserSchema.pre("save", async function(next){
    let user = this;
    try{
        if (user.isModified("password")){
            let saltRounds = 10;
            user.password = await bcrypt.hash(user.password, saltRounds);
        }
        next();
    }
    catch(err){
        next(err);
    }
});
UserSchema.post("save",async function(err,doc,next){
    if(!(err.name ===config.MONGO_ERR && err.code === config.DUP_ERR))
        return next(err);

    let User = this.constructor;
    let field;

    let user = await User.findOne({email: doc.email}).exec();
    if(user && user._id !== doc._id) field = "email";
    else field = "alias";

    next(new Error('Sorry, the given ${field} has been taken'));
});

let User = mongoose.model("User", UserSchema);

exports.User = mongoose.model('User', userSchema);