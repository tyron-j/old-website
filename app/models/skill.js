// skill

var db = require('../utils/db');

module.exports = db.model('Skill', new db.Schema({
	title: {
		type: String,
		required: true
	},

	icon: {
		type: String,
		required: true
	},

	href: {
		type: String,
		required: false
	},

	relevance: { // index of relevance
		type: Number,
		required: true
	}
}));