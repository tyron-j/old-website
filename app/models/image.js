// image

var db = require('../utils/db');

module.exports = db.model('Image', new db.Schema({ // to-do: add creationDate
	title: {
		type: String,
		required: true
	},

	data: {
		type: Buffer,
		required: true
	},

	contentType: {
		type: String,
		required: true
	},

	creationDate: {
		type: Date,
		required: true
	},

	category: {
		type: String,
		required: true
	}
}));