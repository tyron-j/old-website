// user

var db = require('../utils/db');

module.exports = db.model('User', new db.Schema({
	name: {
		first: String,
		last: String
	}
}));