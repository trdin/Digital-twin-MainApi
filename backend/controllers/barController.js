var BarModel = require('../models/barModel.js');

/**
 * barController.js
 *
 * @description :: Server-side logic for managing bars.
 */
module.exports = {

    /**
     * barController.list()
     */
    list: function (req, res) {
        BarModel.find(function (err, bars) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting bar.',
                    error: err
                });
            }

            return res.json(bars);
        });
    },

    /**
     * barController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        BarModel.findOne({ _id: id }, function (err, bar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting bar.',
                    error: err
                });
            }

            if (!bar) {
                return res.status(404).json({
                    message: 'No such bar'
                });
            }

            return res.json(bar);
        });
    },

    /**
     * barController.create()
     */
    create: function (req, res) {
        var bar = new BarModel({
            name: req.body.name,
            address: req.body.address,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
            },
            dataSeries: req.body.dataSeries
        });

        bar.save(function (err, bar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating bar',
                    error: err
                });
            }

            return res.status(201).json(bar);
        });
    },

    /**
     * barController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        BarModel.findOne({ _id: id }, function (err, bar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting bar',
                    error: err
                });
            }

            if (!bar) {
                return res.status(404).json({
                    message: 'No such bar'
                });
            }

            bar.name = req.body.name ? req.body.name : bar.name;
            bar.address = req.body.address ? req.body.address : bar.address;
            bar.location = req.body.location ? req.body.location : bar.location;
            bar.dataSeries = req.body.dataSeries ? req.body.dataSeries : bar.dataSeries;

            bar.save(function (err, bar) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating bar.',
                        error: err
                    });
                }

                return res.json(bar);
            });
        });
    },

    /**
     * barController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        BarModel.findByIdAndRemove(id, function (err, bar) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the bar.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
