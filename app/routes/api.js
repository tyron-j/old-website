var models = require('../models'),
	signal = require('../utils/signal');

module.exports = {
	getImage: function (req, res) {
		models.Artwork.find({}, function (err, artworks) {
			// check typeof artworks
		});
	},
	postImage: function (req, res) {
		// get image data from request and save to database
	}
};