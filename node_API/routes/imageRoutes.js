var express = require('express');
var router = express.Router();
var imageController = require('../controllers/imageController.js');

/*
 * GET
 */
router.get('/', imageController.list);
router.get('/distance', imageController.getDistance);
router.get('/near', imageController.getNear);
/*
 * GET
 */
router.get('/:id', imageController.show);

/*
 * POST
 */
router.post('/', imageController.create);

/*
 * PUT
 */
router.put('/:id', imageController.update);

/*
 * DELETE
 */
router.delete('/:id', imageController.remove);

module.exports = router;