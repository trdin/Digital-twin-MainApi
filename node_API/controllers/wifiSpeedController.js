var WifispeedModel = require('../models/wifiSpeedModel.js');

/**
 * wifiSpeedController.js
 *
 * @description :: Server-side logic for managing wifiSpeeds.
 */
module.exports = {

    /**
     * wifiSpeedController.list()
     */
    list: function (req, res) {
        WifispeedModel.find(function (err, wifiSpeeds) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifiSpeed.',
                    error: err
                });
            }

            return res.json(wifiSpeeds);
        });
    },

    /**
     * wifiSpeedController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        WifispeedModel.findOne({ _id: id }, function (err, wifiSpeed) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifiSpeed.',
                    error: err
                });
            }

            if (!wifiSpeed) {
                return res.status(404).json({
                    message: 'No such wifiSpeed'
                });
            }

            return res.json(wifiSpeed);
        });
    },

    /**
     * wifiSpeedController.create()
     */
    create: function (req, res) {
        var wifiSpeed = new WifispeedModel({
            time: req.body.time,
            speed: req.body.speed,
            wifi: req.body.wifi,
            dataSeries: req.body.dataSeries
        });

        wifiSpeed.save(function (err, wifiSpeed) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating wifiSpeed',
                    error: err
                });
            }

            return res.status(201).json(wifiSpeed);
        });
    },

    /**
     * wifiSpeedController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        WifispeedModel.findOne({ _id: id }, function (err, wifiSpeed) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifiSpeed',
                    error: err
                });
            }

            if (!wifiSpeed) {
                return res.status(404).json({
                    message: 'No such wifiSpeed'
                });
            }

            wifiSpeed.time = req.body.time ? req.body.time : wifiSpeed.time;
            wifiSpeed.speed = req.body.speed ? req.body.speed : wifiSpeed.speed;
            wifiSpeed.wifi = req.body.wifi ? req.body.wifi : wifiSpeed.wifi;
            wifiSpeed.dataSeries = req.body.dataSeries ? req.body.dataSeries : wifiSpeed.dataSeries;

            wifiSpeed.save(function (err, wifiSpeed) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating wifiSpeed.',
                        error: err
                    });
                }

                return res.json(wifiSpeed);
            });
        });
    },

    /**
     * wifiSpeedController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        WifispeedModel.findByIdAndRemove(id, function (err, wifiSpeed) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the wifiSpeed.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    },

    seriesList: function (req, res) {
        let id = req.params.id;
        WifispeedModel.find({ seriesList: id }, function (err, wifis) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting Wifi Speed using seriesList",
                    error: err
                });
            }
            return res.json(wifis);
        })
    }
};
