// image

var db = require('../utils/db');

module.exports = db.model('Image', new db.Schema({
	category: {
		type: String,
		required: true
	},

	title: {
		type: String,
		required: true
	},

	contentType: {
		type: String,
		required: true
	},

	data: {
		type: Buffer,
		required: true
	},

	creationDate: {
		type: Date,
		required: true
	}
}));