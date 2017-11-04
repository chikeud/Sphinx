/**
 * Created by ChikeUdenze on 10/23/17.
 */

let types  = require("mongoose").Types;
let _id = () => types.ObjectId().toString();

exports.testStorer = {
    _id: _id()
    ,alias: "storer"
    ,firstName: "Chike"
    ,lastName: "Udenze"
    ,email: "chu@fakemail.com"
    ,password: "storer-password"
    ,isRenter: false
    ,address: "220 John Street"

};

exports.testRenter = {
    _id: _id()
    ,alias: "renter"
    ,firstName: "Emmanuel"
    ,lastName: "Olaojo"
    ,email: "eoo@fakemail.com"
    ,password: "renter-password"
    ,isRenter: true
    ,ssn: "456789123"
    ,address: "220 John Street"

};
