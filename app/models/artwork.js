// artwork

var db = require('../utils/db');

module.exports = db.model('Artwork', new db.Schema({
	image: {
		data: Buffer,
		contentType: String
	}
}));