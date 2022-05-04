var WifiModel = require('../models/wifiModel.js');

/**
 * wifiController.js
 *
 * @description :: Server-side logic for managing wifis.
 */
module.exports = {

    /**
     * wifiController.list()
     */
    list: function (req, res) {
        WifiModel.find(function (err, wifis) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi.',
                    error: err
                });
            }

            return res.json(wifis);
        });
    },

    /**
     * wifiController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        WifiModel.findOne({_id: id}, function (err, wifi) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi.',
                    error: err
                });
            }

            if (!wifi) {
                return res.status(404).json({
                    message: 'No such wifi'
                });
            }

            return res.json(wifi);
        });
    },

    /**
     * wifiController.create()
     */
    create: function (req, res) {
        var wifi = new WifiModel({
			name : req.body.name,
			password : req.body.password,
			location : req.body.location,
			dataSeries : req.body.dataSeries
        });

        wifi.save(function (err, wifi) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating wifi',
                    error: err
                });
            }

            return res.status(201).json(wifi);
        });
    },

    /**
     * wifiController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        WifiModel.findOne({_id: id}, function (err, wifi) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi',
                    error: err
                });
            }

            if (!wifi) {
                return res.status(404).json({
                    message: 'No such wifi'
                });
            }

            wifi.name = req.body.name ? req.body.name : wifi.name;
			wifi.password = req.body.password ? req.body.password : wifi.password;
			wifi.location = req.body.location ? req.body.location : wifi.location;
			wifi.dataSeries = req.body.dataSeries ? req.body.dataSeries : wifi.dataSeries;
			
            wifi.save(function (err, wifi) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating wifi.',
                        error: err
                    });
                }

                return res.json(wifi);
            });
        });
    },

    /**
     * wifiController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        WifiModel.findByIdAndRemove(id, function (err, wifi) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the wifi.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
