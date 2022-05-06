var express = require('express');
var router = express.Router();
var studentWorkController = require('../controllers/studentWorkController.js');

/*
 * GET
 */
router.get('/', studentWorkController.list);
router.get('/distance', studentWorkController.getDistance);
router.get('/near', studentWorkController.getNear);

/*
 * GET
 */
router.get('/:id', studentWorkController.show);

/*
 * POST
 */
router.post('/', studentWorkController.create);

/*
 * PUT
 */
router.put('/:id', studentWorkController.update);

/*
 * DELETE
 */
router.delete('/:id', studentWorkController.remove);

module.exports = router;
