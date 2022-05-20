const barModel = require('../models/barModel.js');
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
                coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
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
    },
    
    getDistance: function (req, res) {
        var distance = req.query.distance;
        var longitude = req.query.lon;
        var latitude = req.query.lat;
        console.log(distance, longitude, latitude)

        BarModel.find({
            location:
            {
                $geoWithin:
                {
                    $centerSphere: [[parseFloat(latitude), parseFloat(longitude)], parseFloat(distance) / 6378.15214]
                }
            }
        }).exec(function (err, bars) {
            console.log(bars)
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting bar .',
                    error: err
                });
            }
            console.log(bars)
            return res.json(bars);
        })
    },

    getNear: function (req, res) {
        var longitude = req.query.lon;
        var latitude = req.query.lat;
        console.log(longitude, latitude)

        BarModel.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                },
                distanceField: 'distance',
                spherical: true
            }
        }])
            .exec(function (err, bars) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting bars.',
                        error: err
                    });
                }
                return res.json(bars);
            })
    },

    seriesList: function(req,res){
        let id = req.params.id;
        barModel.find({seriesList : id}, function(err, bars){
            if(err){
                return res.status(500).json({
                    message: "Error when getting bars using seriesList",
                    error : err
                });
            }

            return res.json(bars);
        })
    }
};
