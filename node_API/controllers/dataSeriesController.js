var DataseriesModel = require('../models/dataSeriesModel.js');

/**
 * dataSeriesController.js
 *
 * @description :: Server-side logic for managing dataSeriess.
 */
module.exports = {

    /**
     * dataSeriesController.list()
     */
    list: function (req, res) {
        DataseriesModel.find(function (err, dataSeriess) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataSeries.',
                    error: err
                });
            }

            return res.json(dataSeriess);
        });
    },

    /**
     * dataSeriesController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        DataseriesModel.findOne({ _id: id }, function (err, dataSeries) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataSeries.',
                    error: err
                });
            }

            if (!dataSeries) {
                return res.status(404).json({
                    message: 'No such dataSeries'
                });
            }

            return res.json(dataSeries);
        });
    },

    /**
     * dataSeriesController.create()
     */
    create: function (req, res) {
        var dataSeries = new DataseriesModel({
            title: req.body.title,
            tags: req.body.tags,
            lastUpdated: Date.now(),
            settings: {
                refresh_rate: parseInt(req.body.refresh_rate),
                priority: parseInt(req.body.priority)
            }
        });

        dataSeries.save(function (err, dataSeries) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating dataSeries',
                    error: err
                });
            }

            return res.status(201).json(dataSeries);
        });
    },

    /**
     * dataSeriesController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        DataseriesModel.findOne({ _id: id }, function (err, dataSeries) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataSeries',
                    error: err
                });
            }

            if (!dataSeries) {
                return res.status(404).json({
                    message: 'No such dataSeries'
                });
            }

            dataSeries.title = req.body.title ? req.body.title : dataSeries.title;
            dataSeries.tags = req.body.tags ? req.body.tags : dataSeries.tags;
            dataSeries.settings = req.body.settings ? req.body.settings : dataSeries.settings;

            dataSeries.save(function (err, dataSeries) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating dataSeries.',
                        error: err
                    });
                }

                return res.json(dataSeries);
            });
        });
    },

    /**
     * dataSeriesController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        DataseriesModel.findByIdAndRemove(id, function (err, dataSeries) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the dataSeries.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
