var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
	'name': String,
	'start': Date,
	'finish': Date,
	'address': String,
	'loaction': {
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

module.exports = mongoose.model('event', eventSchema);
