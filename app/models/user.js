// user

var db = require('../utils/db');

module.exports = db.model('User', new db.Schema({
	firstName: {
		type: String,
		required: true
	},

	lastName: {
		type: String,
		required: true
	},

	question: {
		type: String,
		required: true
	},

	answers: {
		type: [ String ],
		required: true
	}
}));