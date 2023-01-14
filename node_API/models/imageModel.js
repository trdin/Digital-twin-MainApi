var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
	'people' : Number,
	'time': Date,
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
	}
});

module.exports = mongoose.model('image', imageSchema);
