var FacultyModel = require('../models/facultyModel.js');

/**
 * facultyController.js
 *
 * @description :: Server-side logic for managing facultys.
 */
module.exports = {

    /**
     * facultyController.list()
     */
    list: function (req, res) {
        FacultyModel.find(function (err, facultys) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting faculty.',
                    error: err
                });
            }

            return res.json(facultys);
        });
    },

    /**
     * facultyController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        FacultyModel.findOne({ _id: id }, function (err, faculty) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting faculty.',
                    error: err
                });
            }

            if (!faculty) {
                return res.status(404).json({
                    message: 'No such faculty'
                });
            }

            return res.json(faculty);
        });
    },

    /**
     * facultyController.create()
     */
    create: function (req, res) {
        var faculty = new FacultyModel({
            name: req.body.name,
            address: req.body.address,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
            },
            dataSeries: req.body.dataSeries
        });

        faculty.save(function (err, faculty) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating faculty',
                    error: err
                });
            }

            return res.status(201).json(faculty);
        });
    },

    /**
     * facultyController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        FacultyModel.findOne({ _id: id }, function (err, faculty) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting faculty',
                    error: err
                });
            }

            if (!faculty) {
                return res.status(404).json({
                    message: 'No such faculty'
                });
            }

            faculty.name = req.body.name ? req.body.name : faculty.name;
            faculty.address = req.body.address ? req.body.address : faculty.address;
            faculty.location = req.body.location ? req.body.location : faculty.location;
            faculty.dataSeries = req.body.dataSeries ? req.body.dataSeries : faculty.dataSeries;

            faculty.save(function (err, faculty) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating faculty.',
                        error: err
                    });
                }

                return res.json(faculty);
            });
        });
    },

    /**
     * facultyController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        FacultyModel.findByIdAndRemove(id, function (err, faculty) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the faculty.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
