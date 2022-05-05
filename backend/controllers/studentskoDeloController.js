var StudentskodeloModel = require('../models/studentskoDeloModel.js');

/**
 * studentskoDeloController.js
 *
 * @description :: Server-side logic for managing studentskoDelos.
 */
module.exports = {

    /**
     * studentskoDeloController.list()
     */
    list: function (req, res) {
        StudentskodeloModel.find(function (err, studentskoDelos) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentskoDelo.',
                    error: err
                });
            }

            return res.json(studentskoDelos);
        });
    },

    /**
     * studentskoDeloController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        StudentskodeloModel.findOne({ _id: id }, function (err, studentskoDelo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentskoDelo.',
                    error: err
                });
            }

            if (!studentskoDelo) {
                return res.status(404).json({
                    message: 'No such studentskoDelo'
                });
            }

            return res.json(studentskoDelo);
        });
    },

    /**
     * studentskoDeloController.create()
     */
    create: function (req, res) {
        var studentskoDelo = new StudentskodeloModel({
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

        studentskoDelo.save(function (err, studentskoDelo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating studentskoDelo',
                    error: err
                });
            }

            return res.status(201).json(studentskoDelo);
        });
    },

    /**
     * studentskoDeloController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        StudentskodeloModel.findOne({ _id: id }, function (err, studentskoDelo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting studentskoDelo',
                    error: err
                });
            }

            if (!studentskoDelo) {
                return res.status(404).json({
                    message: 'No such studentskoDelo'
                });
            }

            studentskoDelo.type = req.body.type ? req.body.type : studentskoDelo.type;
            studentskoDelo.subType = req.body.subType ? req.body.subType : studentskoDelo.subType;
            studentskoDelo.payNET = req.body.payNET ? req.body.payNET : studentskoDelo.payNET;
            studentskoDelo.payGROSS = req.body.payGROSS ? req.body.payGROSS : studentskoDelo.payGROSS;
            studentskoDelo.descripction = req.body.descripction ? req.body.descripction : studentskoDelo.descripction;
            studentskoDelo.lenght = req.body.lenght ? req.body.lenght : studentskoDelo.lenght;
            studentskoDelo.workTime = req.body.workTime ? req.body.workTime : studentskoDelo.workTime;
            studentskoDelo.company = req.body.company ? req.body.company : studentskoDelo.company;
            studentskoDelo.email = req.body.email ? req.body.email : studentskoDelo.email;
            studentskoDelo.phone = req.body.phone ? req.body.phone : studentskoDelo.phone;
            studentskoDelo.address = req.body.address ? req.body.address : studentskoDelo.address;
            studentskoDelo.location = req.body.location ? req.body.location : studentskoDelo.location;
            studentskoDelo.link = req.body.link ? req.body.link : studentskoDelo.link;
            studentskoDelo.dataSeries = req.body.dataSeries ? req.body.dataSeries : studentskoDelo.dataSeries;

            studentskoDelo.save(function (err, studentskoDelo) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating studentskoDelo.',
                        error: err
                    });
                }

                return res.json(studentskoDelo);
            });
        });
    },

    /**
     * studentskoDeloController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        StudentskodeloModel.findByIdAndRemove(id, function (err, studentskoDelo) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the studentskoDelo.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
