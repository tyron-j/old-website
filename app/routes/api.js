// api

var formidable = require('formidable');
var fs         = require('fs');
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
		// req.body seems to work only with post requests
		var name = req.body.name.toLowerCase().split(' ');
		var user = new models.User({
			name: {
				first: name[0],
				last: name[1]
			}
		});

		user.save(function (err, u) {
			if (err) {
				signal.error("Failed to save " + name.join(' ') + " to database");
				throw err; // to-do: handle error gracefully
			}

			signal.success("Saved " + name.join(' ') + " to database");
			res.redirect('/success'); // to-do: change redirect
		});
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
			var form  = new formidable.IncomingForm();
			var count = 0; // count of uploaded artworks
			var artwork;

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
					signal.error("Failed to parse form");
					throw err; // to-do: handle error gracefully
				}

				// important: artworks is the name of the file input tag
				files.artworks.forEach(function (file) {
					var fileName      = file.name.split('.')[0];
					var fileExtension = file.name.split('.')[1];

					fs.readFile(file.path, function (err, data) {
						if (err) {
							signal.error("Failed to read " + file.path);
							throw err; // to-do: handle error gracefully
						}

						artwork = new models.Artwork({
							image: {
								name: fileName,
								data: data,
								contentType: 'image/' + fileExtension
							}
						});

						artwork.save(function (err, a) {
							if (err) {
								signal.error("Failed to save " + file.name + " to database");
								throw err; // to-do: handle error gracefully
							}

							signal.success("Saved " + file.name + " to database");
							count++;

							if (count === files.artworks.length) {
								res.redirect('/success'); // to-do: change redirect
							}
						});

						fs.unlink(file.path); // delete artwork in temp directory
					});
				});
			});
		}
	}
};