var express = require('express');
var router = express.Router();
var wifiController = require('../controllers/wifiController.js');

/*
 * GET
 */
router.get('/', wifiController.list);

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
