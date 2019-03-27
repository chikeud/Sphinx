/**
 * @author dejijaye
 */

let express = require("express");
let pwd = require('./password');

let router = express.Router();

router.post('/forgot', pwd.forgotPassword);
router.get('/reset/:token', pwd.validate);
router.post('/reset/:token', pwd.reset);
router.post('/:id/change', pwd.change);

module.exports = router;