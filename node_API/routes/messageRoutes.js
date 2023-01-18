var express = require('express');
var router = express.Router();
var messageController = require('../controllers/messageController.js');

/*
 * GET
 */
router.get('/', messageController.list);
router.get('/distance', messageController.getDistance);
router.get('/near', messageController.getNear);
/*
 * GET
 */
router.get('/:id', messageController.show);

/*
 * POST
 */
router.post('/', messageController.create);

/*
 * PUT
 */
router.put('/:id', messageController.update);

/*
 * DELETE
 */
router.delete('/deleteall', messageController.removeall);
router.delete('/:id', messageController.remove);

module.exports = router;