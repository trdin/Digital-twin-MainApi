var express = require('express');
var router = express.Router();
var dormController = require('../controllers/dormController.js');

/*
 * GET
 */
router.get('/', dormController.list);
router.get('/seriesList/:id', dormController.seriesList);

/*
 * GET
 */
router.get('/:id', dormController.show);

/*
 * POST
 */
router.post('/', dormController.create);

/*
 * PUT
 */
router.put('/:id', dormController.update);

/*
 * DELETE
 */
router.delete('/:id', dormController.remove);

module.exports = router;
