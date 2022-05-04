var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dataSeriesSchema = new Schema({
	'title': {
		type: String,
		required: true
	},
	'tags': Array,
	'settings': {
		'refresh_rate': number,
		'priority': number
	}
});

module.exports = mongoose.model('dataSeries', dataSeriesSchema);
