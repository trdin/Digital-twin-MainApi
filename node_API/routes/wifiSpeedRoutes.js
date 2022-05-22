var express = require('express');
var router = express.Router();
var wifiSpeedController = require('../controllers/wifiSpeedController.js');

function requiresLogin(req, res, next) {
    if (req.session && req.session.userId) {
        return next();
    } else {
        var err = new Error("You must be logged in to view this page");
        err.status = 401;
        return next(err);
    }
}
/*
 * GET
 */
router.get('/', wifiSpeedController.list);
router.get('/seriesList/:id', wifiSpeedController.seriesList);

/*
 * GET
 */
router.get('/:id', wifiSpeedController.show);

/*
 * POST
 */
router.post('/', requiresLogin, wifiSpeedController.create);

/*
 * PUT
 */
router.put('/:id', wifiSpeedController.update);

/*
 * DELETE
 */
router.delete('/:id', wifiSpeedController.remove);

module.exports = router;
