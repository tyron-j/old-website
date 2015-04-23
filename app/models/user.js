// user

var db = require('../utils/db');

module.exports = db.model('User', new db.Schema({
	name: {
		first: {
			type: String,
			required: true
		},

		last: {
			type: String,
			required: true
		}
	}
}));