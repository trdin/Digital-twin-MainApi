var express = require('express');
var router = express.Router();
var wifiController = require('../controllers/wifiController.js');

/*
 * GET
 */
router.get('/', wifiController.list);
router.get('/distance', wifiController.getDistance);
router.get('/near', wifiController.getNear);
/*
 * GET
 */
router.get('/:id', wifiController.show);

/*
 * POST
 */
router.post('/', wifiController.create);

/*
 * PUT
 */
router.put('/:id', wifiController.update);

/*
 * DELETE
 */
router.delete('/:id', wifiController.remove);

module.exports = router;
