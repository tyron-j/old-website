// news

var db = require('../utils/db');

module.exports = db.model('News', new db.Schema({
	href: {
		type: String,
		required: true
	},

	imageTitle: {
		type: String,
		required: true
	},

	creationDate: {
		type: Date,
		required: true
	}
}));