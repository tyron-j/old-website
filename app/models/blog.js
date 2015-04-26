// blog

var db = require('../utils/db');

module.exports = db.model('Blog', new db.Schema({
	title: {
		type: String,
		required: true
	},

	content: {
		type: String,
		required: true
	},

	creationDate: {
		type: Date,
		required: true
	}
}));