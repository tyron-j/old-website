// blog

var db = require('../utils/db');

module.exports = db.model('Blog', new db.Schema({
	category: {
		type: String,
		required: false
	},

	title: {
		type: String,
		required: true
	},

	content: {
		type: String,
		required: true
	},

	bgImageTitle: {
		type: String,
		required: false
	},

	creationDate: {
		type: Date,
		required: true
	}
}));