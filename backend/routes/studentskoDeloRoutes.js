var express = require('express');
var router = express.Router();
var studentskoDeloController = require('../controllers/studentskoDeloController.js');

/*
 * GET
 */
router.get('/', studentskoDeloController.list);

/*
 * GET
 */
router.get('/:id', studentskoDeloController.show);

/*
 * POST
 */
router.post('/', studentskoDeloController.create);

/*
 * PUT
 */
router.put('/:id', studentskoDeloController.update);

/*
 * DELETE
 */
router.delete('/:id', studentskoDeloController.remove);

module.exports = router;
