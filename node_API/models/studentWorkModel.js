var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentWorkSchema = new Schema({
	'type': String,
	'subType': String,
	'payNET': Number,
	'payGROSS': Number,
	'description': String,
	'lenght': String,
	'workTime': String,
	'company': String,
	'email': String,
	'phone': String,
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
	'link': String,
	'fetchId': String,
	'dataSeries': {
		type: Schema.Types.ObjectId,
		ref: 'dataSeries'
	}
});

module.exports = mongoose.model('studentWork', studentWorkSchema);
