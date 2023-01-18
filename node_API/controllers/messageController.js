var messageModel = require('../models/messageModel.js');

/**
 * messageController.js
 *
 * @description :: Server-side logic for managing messages.
 */
module.exports = {

    /**
     * messageController.list()
     */
    list: function (req, res) {
        messageModel.find(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message.',
                    error: err
                });
            }

            return res.json(messages);
        });
    },

    /**
     * messageController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        messageModel.findOne({ _id: id }, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message.',
                    error: err
                });
            }

            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }

            return res.json(message);
        });
    },

    /**
     * messageController.create()
     */
    create: function (req, res) {
        var message = new messageModel({
            content: req.body.content,
            category: req.body.category,
            time: new Date(req.body.time),
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
            },
        });

        message.save(function (err, message) {

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
     * messageController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        messageModel.findOne({ _id: id }, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message',
                    error: err
                });
            }

            if (!message) {
                return res.status(404).json({
                    message: 'No such message'
                });
            }

            message.content = req.body.content ? req.body.content : message.content;
            message.category = req.body.category ? req.body.category : message.category;
            message.time = req.body.time ? req.body.time : message.time;
            message.location = req.body.location ? req.body.location : message.location;

            message.save(function (err, message) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating message.',
                        error: err
                    });
                }

                return res.json(message);
            });
        });
    },

    /**
     * messageController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        messageModel.findByIdAndRemove(id, function (err, message) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the message.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    /**
     * messageController.removeall()
     */
    removeall: function (req, res) {
        console.log("REMOVE ALL REQ");
        messageModel.remove({}, function (err, message) {
            console.log("REMOVE SUCC");
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

        messageModel.find({
            location:
            {
                $geoWithin:
                {
                    $centerSphere: [[parseFloat(latitude), parseFloat(longitude)], parseFloat(distance) / 6378.15214]
                }
            }
        }).exec(function (err, messages) {
            console.log(messages)
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting message .',
                    error: err
                });
            }
            console.log(messages)
            return res.json(messages);
        })
    },

    getNear: function (req, res) {
        var longitude = req.query.lon;
        var latitude = req.query.lat;
        console.log(longitude, latitude)

        messageModel.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                },
                distanceField: 'distance',
                spherical: true
            }
        }])
            .exec(function (err, messages) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting messages.',
                        error: err
                    });
                }
                return res.json(messages);
            })
    },

    seriesList: function (req, res) {
        let id = req.params.id;
        messageModel.find({ seriesList: id }, function (err, messages) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting messages using seriesList",
                    error: err
                });
            }

            return res.json(messages);
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
        messageModel.find(searchConditions).exec(function (err, messages) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting messages.',
                    error: err
                });
            }

            return res.json(messages);
        })
    }
};
