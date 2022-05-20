var DormModel = require('../models/dormModel.js');

/**
 * dormController.js
 *
 * @description :: Server-side logic for managing dorms.
 */
module.exports = {

    /**
     * dormController.list()
     */
    list: function (req, res) {
        DormModel.find(function (err, dorms) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dorm.',
                    error: err
                });
            }

            return res.json(dorms);
        });
    },

    /**
     * dormController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        DormModel.findOne({ _id: id }, function (err, dorm) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dorm.',
                    error: err
                });
            }

            if (!dorm) {
                return res.status(404).json({
                    message: 'No such dorm'
                });
            }

            return res.json(dorm);
        });
    },

    /**
     * dormController.create()
     */
    create: function (req, res) {
        var dorm = new DormModel({
            name: req.body.name,
            address: req.body.address,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
            },
            dataSeries: req.body.dataSeries
        });

        dorm.save(function (err, dorm) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating dorm',
                    error: err
                });
            }

            return res.status(201).json(dorm);
        });
    },

    /**
     * dormController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        DormModel.findOne({ _id: id }, function (err, dorm) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dorm',
                    error: err
                });
            }

            if (!dorm) {
                return res.status(404).json({
                    message: 'No such dorm'
                });
            }

            dorm.name = req.body.name ? req.body.name : dorm.name;
            dorm.address = req.body.address ? req.body.address : dorm.address;
            dorm.location = req.body.location ? req.body.location : dorm.location;
            dorm.dataSeries = req.body.dataSeries ? req.body.dataSeries : dorm.dataSeries;

            dorm.save(function (err, dorm) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating dorm.',
                        error: err
                    });
                }

                return res.json(dorm);
            });
        });
    },

    /**
     * dormController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        DormModel.findByIdAndRemove(id, function (err, dorm) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the dorm.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    seriesList: function(req,res){
        let id = req.params.id;
        DormModel.find({seriesList : id}, function(err, bars){
            if(err){
                return res.status(500).json({
                    message: "Error when getting Dormitories using seriesList",
                    error : err
                });
            }
            return res.json(bars);
        })
    }
};
