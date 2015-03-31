// blog

var db = require('../utils/db');

module.exports = db.model('Blog', new db.Schema({
	title: String,
	content: String
}));