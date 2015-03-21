// api

var models = require('../models');
var signal = require('../utils/signal');

module.exports = {
	getImage: function (req, res) { // to-do: update this function
		models.Artwork.find({}, function (err, artworks) {
			if (artworks.length) {
				res.contentType(artworks[0].image.contentType);
				res.send(artworks[0].image.data);
			}
		});
	},
	postImage: function (req, res) {
		// get image data from request and save to database
	}
};