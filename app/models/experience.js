// experience

var db = require('../utils/db');

module.exports = db.model('Experience', new db.Schema({
	category: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	company: {
		type: String,
		required: false
	},

	tasks: {
		type: [String],
		required: true
	},

	duration: {
		type: String,
		required: true
	},

	relevance: { // index of relevance
		type: Number,
		required: true
	}
}));