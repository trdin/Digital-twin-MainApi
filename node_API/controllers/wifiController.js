var WifiModel = require('../models/wifiModel.js');
var WifiSpeedModel = require('../models/wifiSpeedModel.js');
var DataseriesModel = require('../models/dataSeriesModel.js');
/**
 * wifiController.js
 *
 * @description :: Server-side logic for managing wifis.
 */
module.exports = {

    /**
     * wifiController.list()
     */
    list: function (req, res) {
        WifiModel.find(function (err, wifis) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi.',
                    error: err
                });
            }

            return res.json(wifis);
        });
    },

    /**
     * wifiController.show()
     */
    show: async function (req, res) {
        var id = req.params.id;

        WifiModel.findOne({ _id: id }, async function (err, wifi) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi.',
                    error: err
                });
            }

            if (!wifi) {
                return res.status(404).json({
                    message: 'No such wifi'
                });
            }


            var data = await WifiSpeedModel.find({ wifi: wifi.id })
            var averageSpeed = data.reduce((sum, speed) => sum + parseFloat(speed.speed), 0) / data.length
            WifiSpeedModel.find({ wifi: wifi.id }).exec(function (err, wifiSpeeds) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting wifi.',
                        error: err
                    });
                }
                return res.json({
                    wifi: wifi,
                    speed: averageSpeed.toFixed(2),
                    wifiSpeeds: wifiSpeeds
                });
            })
        });
    },

    /**
     * wifiController.create()
     */
    create: function (req, res) {
        var wifi = new WifiModel({
            name: req.body.name,
            password: req.body.password,
            location: {
                type: 'Point',
                coordinates: [parseFloat(req.body.latitude), parseFloat(req.body.longitude)]
            },
            dataSeries: req.body.dataSeries,
            wifiId : req.body.wifiId
        });
        if (wifi.dataSeries == undefined) {
            DataseriesModel.find({ title: req.body.dataSeriesTitle }, function (err, dataSeries) {
                if (err) {
                    return res.status(500).json({
                        message: 'Cant get Dataseries',
                        error: err
                    });
                }

                if (!dataSeries) {
                    return res.status(404).json({
                        message: 'No such dataSeries'
                    });
                }


                wifi.dataSeries = dataSeries._id

                wifi.save(function (err, wifi) {
                    if (err) {
                        return res.status(500).json({
                            message: 'Error when creating wifi',
                            error: err
                        });
                    }

                    return res.status(201).json(wifi);
                });
            })
        } else {
            wifi.save(function (err, wifi) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating wifi',
                        error: err
                    });
                }

                return res.status(201).json(wifi);
            });
        }

    },

    /**
     * wifiController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        WifiModel.findOne({ _id: id }, function (err, wifi) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi',
                    error: err
                });
            }

            if (!wifi) {
                return res.status(404).json({
                    message: 'No such wifi'
                });
            }

            wifi.name = req.body.name ? req.body.name : wifi.name;
            wifi.password = req.body.password ? req.body.password : wifi.password;
            wifi.location = req.body.location ? req.body.location : wifi.location;
            wifi.dataSeries = req.body.dataSeries ? req.body.dataSeries : wifi.dataSeries;

            wifi.save(function (err, wifi) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating wifi.',
                        error: err
                    });
                }

                return res.json(wifi);
            });
        });
    },

    /**
     * wifiController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        WifiModel.findByIdAndRemove(id, function (err, wifi) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the wifi.',
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

        WifiModel.find({
            location:
            {
                $geoWithin:
                {
                    $centerSphere: [[parseFloat(latitude), parseFloat(longitude)], parseFloat(distance) / 6378.15214]
                }
            }
        }).exec(function (err, wifis) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi .',
                    error: err
                });
            }
            return res.json(wifis);
        })
    },

    getNear: function (req, res) {
        var longitude = req.query.lon;
        var latitude = req.query.lat;

        WifiModel.aggregate([{
            $geoNear: {
                near: {
                    type: 'Point',
                    coordinates: [parseFloat(latitude), parseFloat(longitude)]
                },
                distanceField: 'distance',
                spherical: true
            }
        }])
            .exec(function (err, wifis) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when getting wifis.',
                        error: err
                    });
                }
                return res.json(wifis);
            })
    },

    seriesList: function (req, res) {
        let id = req.params.id;
        WifiModel.find({ seriesList: id }, function (err, wifis) {
            if (err) {
                return res.status(500).json({
                    message: "Error when getting Wifi using seriesList",
                    error: err
                });
            }
            return res.json(wifis);
        })
    },

    getWifiSpeeds: async function (req, res) {
        WifiModel.find(async function (err, wifis) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifi.',
                    error: err
                });
            }
            var returnData = []
            for (let i = 0; i < wifis.length; ++i) {
                var data = await WifiSpeedModel.find({ wifi: wifis[i].id })
                var averageSpeed = data.reduce((sum, speed) => sum + parseFloat(speed.speed), 0) / data.length
                var obj = {
                    wifi: wifis[i],
                    speed: averageSpeed
                }
                returnData.push(obj)
            }

            return res.json(returnData);
        });
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
        WifiModel.find(searchConditions).exec(async function (err, wifis) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting wifis.',
                    error: err
                });
            }
            var returnData = []
            for (let i = 0; i < wifis.length; ++i) {
                var data = await WifiSpeedModel.find({ wifi: wifis[i].id })
                var averageSpeed = data.reduce((sum, speed) => sum + parseFloat(speed.speed), 0) / data.length
                var obj = {
                    wifi: wifis[i],
                    speed: averageSpeed.toFixed(2)
                }
                returnData.push(obj)
            }

            return res.json(returnData);
        })
    },
};
