/**
 * @author dejijaye
 */

let express = require("express");
let listing = require('./listing');
let auth = require("../../../utils/authToken");

let router = express.Router();

router.post('/', auth.checkToken, listing.create);
router.get('/', auth.checkToken, listing.findAll)
router.get('/:id', auth.checkToken, listing.hasAuthorization, listing.findOne);
router.put('/:id', auth.checkToken,listing.hasAuthorization,  listing.edit);
router.delete('/:id', auth.checkToken, listing.hasAuthorization, listing.delete);

module.exports = router;