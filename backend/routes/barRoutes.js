var express = require('express');
var router = express.Router();
var barController = require('../controllers/barController.js');

/*
 * GET
 */
router.get('/', barController.list);

/*
 * GET
 */
router.get('/:id', barController.show);

/*
 * POST
 */
router.post('/', barController.create);

/*
 * PUT
 */
router.put('/:id', barController.update);

/*
 * DELETE
 */
router.delete('/:id', barController.remove);

module.exports = router;
