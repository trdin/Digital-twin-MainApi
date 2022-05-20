var RestaurantModel = require('../models/restaurantModel.js');

/**
 * restaurantController.js
 *
 * @description :: Server-side logic for managingrestaurants.
 */
module.exports = {

    /**
     * restaurant Controller.list()
     */
    list: function (req, res) {
        RestaurantModel.find(function (err, restaurants) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurant .',
                    error: err
                });
            }

            return res.json(restaurants);
        });
    },

    /**
     * restaurant Controller.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findOne({ _id: id }, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurant .',
                    error: err
                });
            }

            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant '
                });
            }

            return res.json(restaurant);
        });
    },

    /**
     * restaurantController.create()
     */
    create: function (req, res) {
        var restaurant = new RestaurantModel({
            name: req.body.name,
            surcharge: req.body.surcharge,
            price: req.body.price,
            address: req.body.address,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
            },
            dataSeries: req.body.dataSeries
        });

        restaurant.save(function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating restaurant ',
                    error: err
                });
            }

            return res.status(201).json(restaurant);
        });
    },

    /**
     * restaurant Controller.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findOne({ _id: id }, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurant ',
                    error: err
                });
            }

            if (!restaurant) {
                return res.status(404).json({
                    message: 'No such restaurant '
                });
            }

            restaurant.name = req.body.name ? req.body.name : restaurant.name;
            restaurant.surcharge = req.body.surcharge ? req.body.surcharge : restaurant.surcharge;
            restaurant.price = req.body.price ? req.body.price : restaurant.price;
            restaurant.address = req.body.address ? req.body.address : restaurant.address;
            restaurant.location = req.body.location ? req.body.location : restaurant.location;
            restaurant.dataSeries = req.body.dataSeries ? req.body.dataSeries : restaurant.dataSeries;

            restaurant.save(function (err, restaurant) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating restaurant .',
                        error: err
                    });
                }

                return res.json(restaurant);
            });
        });
    },

    /**
     * restaurant Controller.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        RestaurantModel.findByIdAndRemove(id, function (err, restaurant) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the restaurant .',
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

        RestaurantModel.find({
            location:
            {
                $geoWithin:
                {
                    $centerSphere: [[parseFloat(latitude), parseFloat(longitude)], parseFloat(distance) / 6378.15214]
                }
            }
        }).exec(function (err, restaurants) {
            console.log(restaurants)
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting restaurant .',
                    error: err
                });
            }
            console.log(restaurants)
            return res.json(restaurants);
        })
    },
    getNear: function (req, res) {
        var longitude = req.query.lon;
        var latitude = req.query.lat;
        console.log(longitude, latitude)

        RestaurantModel.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                },
                distanceField: 'distance',
                spherical: true
            }
        }])
            .exec(function (err, restaurants) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting restaurants.',
                        error: err
                    });
                }
                console.log(restaurants)
                return res.json(restaurants);
            })
    }
};
