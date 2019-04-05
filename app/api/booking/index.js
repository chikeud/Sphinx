/**
 * @author dejijaye
 */

let express = require("express");
let booking = require('./booking');
let auth = require("../../../utils/authToken");

let router = express.Router();

router.post('/item/:id/book', auth.checkToken, booking.create);
router.get('/booking', auth.checkToken, booking.findAll)
router.get('/booking/:id', auth.checkToken, booking.hasAuthorization, booking.findOne);
router.put('/booking/:id', auth.checkToken, booking.hasAuthorization, booking.edit);
router.delete('/booking/:id', auth.checkToken, booking.hasAuthorization, booking.delete);

module.exports = router;