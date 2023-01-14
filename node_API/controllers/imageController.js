var imageModel = require('../models/imageModel.js');

/**
 * imageController.js
 *
 * @description :: Server-side logic for managing images.
 */
module.exports = {

    /**
     * imageController.list()
     */
    list: function (req, res) {
        imageModel.find(function (err, images) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting image.',
                    error: err
                });
            }

            return res.json(images);
        });
    },

    /**
     * imageController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        imageModel.findOne({ _id: id }, function (err, image) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting image.',
                    error: err
                });
            }

            if (!message) {
                return res.status(404).json({
                    message: 'No such image'
                });
            }

            return res.json(image);
        });
    },

    /**
     * imageController.create()
     */
    create: function (req, res) {
        var image = new imageModel({
            
            people: req.body.people,
            time: new Date(req.body.time),
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
            },
        });

        image.save(function (err, message) {

            if (err) {
                return res.status(500).json({
                    message: 'Error when creating message',
                    error: err
                });
            }

            return res.status(201).json(message);
        });
    },

    /**
     * imageController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        imageModel.findOne({ _id: id }, function (err, image) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting image',
                    error: err
                });
            }

            if (!image) {
                return res.status(404).json({
                    message: 'No such image'
                });
            }

            
            image.people = req.body.people ? req.body.people : image.people;
            image.time = req.body.time ? req.body.time : image.time;
            image.location = req.body.location ? req.body.location : image.location;

            image.save(function (err, image) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating message.',
                        error: err
                    });
                }

                return res.json(image);
            });
        });
    },

    /**
     * imageController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        imageModel.findByIdAndRemove(id, function (err, image) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the message.',
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

        imageModel.find({
            location:
            {
                $geoWithin:
                {
                    $centerSphere: [[parseFloat(latitude), parseFloat(longitude)], parseFloat(distance) / 6378.15214]
                }
            }
        }).exec(function (err, images) {
            console.log(images)
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message .',
                    error: err
                });
            }
            return res.json(images);
        })
    },

    getNear: function (req, res) {
        var longitude = req.query.lon;
        var latitude = req.query.lat;
        console.log(longitude, latitude)

        imageModel.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                },
                distanceField: 'distance',
                spherical: true
            }
        }])
            .exec(function (err, images) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting images.',
                        error: err
                    });
                }
                return res.json(images);
            })
    },

    seriesList: function (req, res) {
        let id = req.params.id;
        imageModel.find({ seriesList: id }, function (err, images) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting images using seriesList",
                    error: err
                });
            }

            return res.json(images);
        })
    },
    search: function (req, res) {
        var tag = req.body.search;
        var distance = req.body.distance;
        var longitude = req.body.longitude;
        var latitude = req.body.latitude;

        var searchConditions = {
            $and: [
                { name: { $regex: tag, $options: 'i' } },
            ]
        };
        if (distance != undefined && distance != '' && distance != 0
            && longitude != 0 && latitude != 0
            && longitude != undefined && latitude != undefined) {
            searchConditions.$and.push({
                location:
                {
                    $geoWithin:
                    {
                        $centerSphere: [[parseFloat(latitude), parseFloat(longitude)], parseFloat(distance) / 6378.15214]
                    }
                }
            });
        }
        imageModel.find(searchConditions).exec(function (err, images) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting images.',
                    error: err
                });
            }

            return res.json(images);
        })
    }
};
