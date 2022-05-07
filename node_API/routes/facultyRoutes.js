var express = require('express');
var router = express.Router();
var facultyController = require('../controllers/facultyController.js');

/*
 * GET
 */
router.get('/', facultyController.list);

/*
 * GET
 */
router.get('/:id', facultyController.show);

/*
 * POST
 */
router.post('/', facultyController.create);

/*
 * PUT
 */
router.put('/:id', facultyController.update);

/*
 * DELETE
 */
router.delete('/:id', facultyController.remove);

module.exports = router;
