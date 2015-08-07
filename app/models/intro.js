// intro

var db = require('../utils/db');

module.exports = db.model('Intro', new db.Schema({
	content: {
		type: String,
		required: true
	}
}));