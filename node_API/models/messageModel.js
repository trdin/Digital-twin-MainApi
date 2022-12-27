var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
	'content': String,
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

module.exports = mongoose.model('message', messageSchema);
