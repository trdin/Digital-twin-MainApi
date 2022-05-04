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
			required: true
		}
	},
	'dataSeries': {
		type: Schema.Types.ObjectId,
		ref: 'dataSeries'
	}
});

module.exports = mongoose.model('wifi', wifiSchema);
