var RestaurantModel = require('../models/RestaurantModel.js');

/**
 * restaurant Controller.js
 *
 * @description :: Server-side logic for managing restaurant s.
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
     * restaurant Controller.create()
     */
    create: function (req, res) {
        var restaurant = new RestaurantModel({
            name: req.body.name,
            surcharge: req.body.surcharge,
            price: req.body.price,
            address: req.body.address,
            location: req.body.location,
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
    }
};
