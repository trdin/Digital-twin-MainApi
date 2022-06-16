var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wifiSchema = new Schema({
	'name': String,
	'password': String,
	'location': {
		type: {
			type: String,
			enum: ['Point'],
			required: true
		},
		coordinates: {
			type: [Number],
			index: "2dsphere",
			required: true
		}
	},
	'dataSeries': {
		type: Schema.Types.ObjectId,
		ref: 'dataSeries'
	},
	'wifiId' : String
});

module.exports = mongoose.model('wifi', wifiSchema);
