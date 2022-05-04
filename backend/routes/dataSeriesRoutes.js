var express = require('express');
var router = express.Router();
var dataSeriesController = require('../controllers/dataSeriesController.js');

/*
 * GET
 */
router.get('/', dataSeriesController.list);

/*
 * GET
 */
router.get('/:id', dataSeriesController.show);

/*
 * POST
 */
router.post('/', dataSeriesController.create);

/*
 * PUT
 */
router.put('/:id', dataSeriesController.update);

/*
 * DELETE
 */
router.delete('/:id', dataSeriesController.remove);

module.exports = router;
