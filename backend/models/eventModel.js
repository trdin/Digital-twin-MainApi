var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	'name': String,
	'start': Date,
	'finish': Date,
	'address': String,
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
	}
});

module.exports = mongoose.model('event', eventSchema);
