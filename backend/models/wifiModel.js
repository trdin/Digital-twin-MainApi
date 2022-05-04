var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var wifiSchema = new Schema({
	'name' : String,
	'password' : String,
	'location' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'loaction'
	},
	'dataSeries' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'dataSeries'
	}
});

module.exports = mongoose.model('wifi', wifiSchema);
