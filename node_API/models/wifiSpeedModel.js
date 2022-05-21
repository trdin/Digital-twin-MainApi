var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wifiSpeedSchema = new Schema({
	'time': Date,
	'speed': Number,
	'wifi': {
		type: Schema.Types.ObjectId,
		ref: 'wifi'
	},
	'dataSeries': {
		type: Schema.Types.ObjectId,
		ref: 'dataSeries'
	}
});

module.exports = mongoose.model('wifiSpeed', wifiSpeedSchema);
