var express = require('express');
var router = express.Router();
var restaurantController = require('../controllers/restaurantController.js');

/*
 * GET
 */
router.get('/', restaurantController.list);
router.get('/distance', restaurantController.getDistance);
router.get('/near', restaurantController.getNear);

/*
 * GET
 */
router.get('/:id', restaurantController.show);

/*
 * POST
 */
router.post('/', restaurantController.create);

/*
 * PUT
 */
router.put('/:id', restaurantController.update);

/*
 * DELETE
 */
router.delete('/:id', restaurantController.remove);

module.exports = router;
