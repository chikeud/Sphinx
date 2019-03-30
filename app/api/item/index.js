/**
 * @author dejijaye
 */

let express = require("express");
let item = require('./item');
let auth = require("../../../utils/authToken");

let router = express.Router();

router.post('/', auth.checkToken, item.create);
router.get('/', auth.checkToken, item.findAll)
router.get('/:id', auth.checkToken, item.findOne);
router.put('/:id', auth.checkToken, item.edit);
router.delete('/:id', auth.checkToken, item.delete);

module.exports = router;