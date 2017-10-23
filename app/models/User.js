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
    let doc = this;
    try{
        if (doc.isModified("password")){
            let saltRounds = 10;
            doc.password = await bcrypt.hash(doc.password, saltRounds);
        }
        next();
    }
    catch(err){
        next(err);
    }
});

let User = mongoose.model("User", UserSchema);

module.exports = User;