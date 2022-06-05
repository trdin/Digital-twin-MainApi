var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	'title': String,
	'content': String,
	'start': Date,
	'end': Date,
	'address': String,
	'url' : String,
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
	'eventId' : String
});

module.exports = mongoose.model('event', eventSchema);
