// api

var formidable = require('formidable');
var util       = require('util'); // remove later?

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

	postArtwork: function (uploadDir) {
		return function (req, res, next) { // currently only works for localhost
			var form = new formidable.IncomingForm();

			console.log("Parsing form");

			form.uploadDir      = uploadDir;
			form.keepExtensions = true;
			form.multiples      = true;

			form.on('fileBegin', function (name, file) {
				var filePath = file.path.split('\\');

				filePath.pop(); // remove the hideous name assigned by formidable
				filePath.push(file.name); // keep original file name

				file.path = filePath.join('\\');
			});

			form.parse(req, function (err, fields, files) {
				if (err) {
					// to-do: handle error gracefully
				}

				console.log("Parsing done");

				res.send(util.inspect({
					fields: fields,
					files: util.inspect(files)
				}));
			});

			// to-do: delete images stored in temp directory
		}
	}
};