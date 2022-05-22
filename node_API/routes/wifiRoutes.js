var express = require('express');
var router = express.Router();
var wifiController = require('../controllers/wifiController.js');

/*
 * GET
 */
router.get('/', wifiController.list);
router.get('/distance', wifiController.getDistance);
router.get('/near', wifiController.getNear);
router.get('/seriesList/:id', wifiController.seriesList);
router.get('/wifiSpeeds', wifiController.getWifiSpeeds);

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
router.get('/:id', wifiController.show);

/*
 * POST
 */
router.post('/', wifiController.create);
router.post('/search', wifiController.search)
router.post('/userCreate', requiresLogin, wifiController.create)

/*
 * PUT
 */
router.put('/:id', wifiController.update);

/*
 * DELETE
 */
router.delete('/:id', wifiController.remove);

module.exports = router;
