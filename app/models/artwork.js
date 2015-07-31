// artwork

// to-do: change to image and make the schema multi-purpose

var db = require('../utils/db');

module.exports = db.model('Artwork', new db.Schema({ // to-do: add creationDate
	title: {
		type: String,
		required: true
	},

	image: {
		data: {
			type: Buffer,
			required: true
		},
		contentType: {
			type: String,
			required: true
		}
	},

	creationDate: {
		type: Date,
		required: true
	}
}));