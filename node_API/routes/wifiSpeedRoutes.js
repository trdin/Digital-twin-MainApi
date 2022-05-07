var express = require('express');
var router = express.Router();
var wifiSpeedController = require('../controllers/wifiSpeedController.js');

/*
 * GET
 */
router.get('/', wifiSpeedController.list);

/*
 * GET
 */
router.get('/:id', wifiSpeedController.show);

/*
 * POST
 */
router.post('/', wifiSpeedController.create);

/*
 * PUT
 */
router.put('/:id', wifiSpeedController.update);

/*
 * DELETE
 */
router.delete('/:id', wifiSpeedController.remove);

module.exports = router;
