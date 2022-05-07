var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentskoDeloSchema = new Schema({
	'type' : String,
	'subType' : String,
	'payNET' : Number,
	'payGROSS' : Number,
	'descripction' : String,
	'lenght' : String,
	'workTime' : String,
	'company' : String,
	'email' : String,
	'phone' : String,
	'address' : String,
	'location' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'nothin'
	},
	'link' : String,
	'dataSeries' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'dataSeries'
	}
});

module.exports = mongoose.model('studentskoDelo', studentskoDeloSchema);
