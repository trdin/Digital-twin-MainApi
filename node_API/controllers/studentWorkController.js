var studentWorkModel = require('../models/studentWorkModel.js');

/**
 * studentWorkController.js
 *
 * @description :: Server-side logic for managing studentWorks.
 */
module.exports = {

    /**
     * studentWorkController.list()
     */
    list: function (req, res) {
        studentWorkModel.find(function (err, studentWorks) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentWork.',
                    error: err
                });
            }

            return res.json(studentWorks);
        });
    },

    /**
     * studentWorkController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        studentWorkModel.findOne({ _id: id }, function (err, studentWork) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentWork.',
                    error: err
                });
            }

            if (!studentWork) {
                return res.status(404).json({
                    message: 'No such studentWork'
                });
            }

            return res.json(studentWork);
        });
    },

    /**
     * studentWorkController.create()
     */
    create: function (req, res) {
        var studentWork = new studentWorkModel({
            type: req.body.type,
            subType: req.body.subType,
            payNET: req.body.payNET,
            payGROSS: req.body.payGROSS,
            descripction: req.body.descripction,
            lenght: req.body.lenght,
            workTime: req.body.workTime,
            company: req.body.company,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.longitude), parseFloat(req.body.latitude)]
            },
            link: req.body.link,
            dataSeries: req.body.dataSeries
        });

        studentWork.save(function (err, studentWork) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentWork',
                    error: err
                });
            }

            return res.status(201).json(studentWork);
        });
    },

    /**
     * studentWorkController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        studentWorkModel.findOne({ _id: id }, function (err, studentWork) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentWork',
                    error: err
                });
            }

            if (!studentWork) {
                return res.status(404).json({
                    message: 'No such studentWork'
                });
            }

            studentWork.type = req.body.type ? req.body.type : studentWork.type;
            studentWork.subType = req.body.subType ? req.body.subType : studentWork.subType;
            studentWork.payNET = req.body.payNET ? req.body.payNET : studentWork.payNET;
            studentWork.payGROSS = req.body.payGROSS ? req.body.payGROSS : studentWork.payGROSS;
            studentWork.descripction = req.body.descripction ? req.body.descripction : studentWork.descripction;
            studentWork.lenght = req.body.lenght ? req.body.lenght : studentWork.lenght;
            studentWork.workTime = req.body.workTime ? req.body.workTime : studentWork.workTime;
            studentWork.company = req.body.company ? req.body.company : studentWork.company;
            studentWork.email = req.body.email ? req.body.email : studentWork.email;
            studentWork.phone = req.body.phone ? req.body.phone : studentWork.phone;
            studentWork.address = req.body.address ? req.body.address : studentWork.address;
            studentWork.location = req.body.location ? req.body.location : studentWork.location;
            studentWork.link = req.body.link ? req.body.link : studentWork.link;
            studentWork.dataSeries = req.body.dataSeries ? req.body.dataSeries : studentWork.dataSeries;

            studentWork.save(function (err, studentWork) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating studentWork.',
                        error: err
                    });
                }

                return res.json(studentWork);
            });
        });
    },

    /**
     * studentWorkController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        studentWorkModel.findByIdAndRemove(id, function (err, studentWork) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentWork.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },
    getDistance: function (req, res) {
        var distance = req.query.distance;
        var longitude = req.query.lon;
        var latitude = req.query.lat;
        console.log(distance, longitude, latitude)

        studentWorkModel.find({
            location:
            {
                $geoWithin:
                {
                    $centerSphere: [[parseFloat(longitude), parseFloat(latitude)], parseFloat(distance) / 6378.15214]
                }
            }
        }).exec(function (err, studentWorks) {
            console.log(studentWorks)
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentWork .',
                    error: err
                });
            }
            console.log(studentWorks)
            return res.json(studentWorks);
        })
    },
    getNear: function (req, res) {
        var longitude = req.query.lon;
        var latitude = req.query.lat;
        console.log(longitude, latitude)

        studentWorkModel.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
                },
                distanceField: 'distance',
                spherical: true
            }
        }])
            .exec(function (err, studentWorks) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting studentWorks.',
                        error: err
                    });
                }
                console.log(studentWorks)
                return res.json(studentWorks);
            })
    }
};
