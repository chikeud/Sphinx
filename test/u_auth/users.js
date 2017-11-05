/**
 * @author ChikeUdenze
 * @since 11/4/2017
 */


let types = require("mongoose").Types;
let id = () => types.ObjectId().toString();
exports.user1 = {
    alias: "c-doug"
    , email: "cdiggy4sho@fakemail.com"
    ,firstName: "Chike"
    ,lastName: "Udenze"
    ,ssn: "657585950"
    ,isRenter: true
};
exports.user1Email = {
    alias: "c-doug2-error-check"
    , email: exports.user1.email
    ,firstName: "Chike"
    ,lastName: "Udenze"
    ,ssn: "657585950"
    ,isRenter: true
};
exports.user1alias = {
    alias: exports.user1.alias
    , email: "cdiggy4sho-error-check@fakemail.com"
    ,firstName: "Chike"
    ,lastName: "Udenze"
    ,ssn: "657585950"
    ,isRenter: true
};
exports.user2 = {
    alias: "crackhead-max"
    , email: "i_heart_crack@fakemail.com"
};
exports.user3 = {
    alias: "spicy-p"
    , email: "royco_cubes@fakemail.com"
};

Object.keys(exports).forEach(key => {
    exports[key]._id = id();
    exports[key].password = "test-password";
});