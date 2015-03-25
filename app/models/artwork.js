// artwork

var db = require('../utils/db');

module.exports = db.model('Artwork', new db.Schema({
	name: String,
	image: {
		data: Buffer,
		contentType: String
	}
}));