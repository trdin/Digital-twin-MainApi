const mjob = require('./mjob');
var DataseriesModel = require('../../models/dataSeriesModel.js');
var updateUnit = 10;

module.exports = {
    update: function () {
        DataseriesModel.find(function (err, dataSeries) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting dataSeries.',
                    error: err
                });
            }
            var mapData = dataSeries.reduce(function (map, obj) {
                map[obj.title] = obj;
                return map;
            }, {});
            /*mapData.forEach((dataSerie) => {
                console.log(dataSerie)
            })*/


            //mjob
            var mjobSerie = mapData.MjobSWork

            //console.log(mjobSerie)
            //refresh_rate*update_enota + last updated > trenutni cas
            var timeToUpdate = mjobSerie.settings.refresh_rate * updateUnit;
            //console.log(timeToUpdate)
            var newDateObj = new Date();
            newDateObj.setTime(mjobSerie.lastUpdated.getTime() + (timeToUpdate * 1000));
            if (newDateObj <= Date.now() || newDateObj.getTime() - 500 <= Date.now()) {
                console.log("----------------update-------------------------")
                mjobSerie.lastUpdated = Date.now();
                mjobSerie.save(function (err, dataSeries) {
                    if (err) {
                        console.log(err)
                    }
                });
            }
        });
    }
}
