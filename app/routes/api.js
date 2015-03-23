// api

var models = require('../models');
var signal = require('../utils/signal');

module.exports = {
	authenticate: function (isLocalHost) { // temporary middleware to protect api
		return function (req, res, next) {
			if (isLocalHost) {
				next();
			} else {
				res.redirect('/unauthorized');
			}
		};
	},

	getUser: function (req, res, next) {
		var name = req.query.name.toLowerCase().split(' ');

		models.User.findOne({
			name: {
				first: name[0],
				last: name[1]
			}
		}, function (err, user) {
			if (err || !user) {
				res.redirect('/unauthorized');
			} else {
				res.redirect('/hello');
			}
		});
	},

	postUser: function (req, res, next) {
		//
	},

	getArtwork: function (req, res, next) { // to-do: update this function
		models.Artwork.find({}, function (err, artworks) {
			if (artworks.length) {
				res.contentType(artworks[0].image.contentType);
				res.send(artworks[0].image.data);
			}
		});
	},

	postArtwork: function (req, res, next) {
		// looks like a module such as formidable or multiparty are required
		// for multipart forms
	}
};