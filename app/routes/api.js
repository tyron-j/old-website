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

	getBlog: function (req, res, next) {
		if (req.params.title) {
			models.Blog.findOne({
				title: req.params.title
			},
			'category content bgImageTitle creationDate',
			function (err, blog) {
				if (blog) {
					res.send(blog);
				} else {
					var failMsg = "Could not find " + req.params.title;

					signal.error(failMsg);
					res.send(failMsg);
				}
			});
		} else {
			models.Blog
				.find({})
				.sort('-creationDate')
				.select('title')
				.exec(function (err, blogs) {
					if (blogs.length) {
						res.send(blogs);
					} else {
						res.send([]);
					}
				});
		}
	},

	postBlog: function (req, res, next) {
		var blog = new models.Blog({
			category: req.body.category,
			title: req.body.title,
			content: req.body.content,
			bgImageTitle: req.body.bgImageTitle,
			creationDate: req.body.creationDate
		});

		blog.save(function (err, b) {
			if (err) {
				signal.error("Failed to save " + req.body.title + " to database");
				throw err; // to-do: handle error gracefully
			}

			var successMsg = "Saved " + req.body.title + " to database";

			signal.success(successMsg);
			res.send({
				msg: successMsg
			});
		});
	},

	putBlog: function (req, res, next) {
		models.Blog.findOneAndUpdate({
			creationDate: req.body.creationDate // creationDate works as a unique identifier
		}, {
			category: req.body.category,
			title: req.body.title,
			content: req.body.content,
			bgImageTitle: req.body.bgImageTitle
		}, function (err, b) { // to-do: handle no matches
			if (err) {
				signal.error("Failed to update " + req.body.title + " in database");
				throw err; // to-do: handle error gracefully
			}

			var successMsg = "Updated " + req.body.title + " in database";

			signal.success(successMsg);
			res.send({
				msg: successMsg
			});
		});
	},

	deleteBlog: function (req, res, next) {
		models.Blog.findOneAndRemove({
			title: req.params.title
		}, function (err, b) {
			if (err) {
				signal.error("Failed to delete " + req.params.title + " in database");
				throw err; // to-do: handle error gracefully
			}

			var successMsg = "Deleted " + req.params.title + " in database";

			signal.success(successMsg);
			res.send({
				msg: successMsg
			});
		});
	},

	getExperience: function (req, res, next) {
		models.Experience
			.find({})
			.sort('relevance')
			.exec(function (err, experiences) {
				if (experiences.length) {
					res.send(experiences);
				} else {
					res.send([]);
				}
			});
	},

	getImage: function (req, res, next) { // to-do: update this function
		if (req.params.category) { // fetch by unique title
			if (req.params.title) {
				models.Image.findOne({
					category: req.params.category,
					title: req.params.title
				}, function (err, image) {
					if (image) {
						res.contentType(image.contentType);
						res.send(image.data);
					} else {
						var failMsg = "Could not find " + req.params.category + "/" + req.params.title;

						signal.error(failMsg);
						res.send(failMsg);
					}
				});
			} else { // fetch images by category
				models.Image
					.find({
						category: req.params.category
					})
					.sort('-creationDate')
					.select('category title') // to-do: send back creationDate as well for updating title
					.exec(function (err, images) {
						if (images.length) {
							res.send(images);
						} else {
							res.send([]);
						}
					});
			}
		}
	},

	postImage: function (uploadDir) {
		return function (req, res, next) { // currently only works for localhost
			var form  = new formidable.IncomingForm();
			var count = 0; // count of uploaded images
			var image;

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

				if (!(files.images instanceof Array)) {
					// convert to array for iterative logic below
					files.images = [ files.images ];
				}

				// important: images is the name of the file input tag
				files.images.forEach(function (file) {
					var fileExtension = file.name.split('.')[1];

					fs.readFile(file.path, function (err, data) {
						if (err) {
							signal.error("Failed to read " + file.path);
							throw err; // to-do: handle error gracefully
						}

						image = new models.Image({
							category: req.params.category,
							title: file.name,
							contentType: 'image/' + fileExtension,
							data: data,
							// creationDate will depend on the heroku server location timezone
							// but this is purely for sorting purposes so it doesn't matter
							creationDate: new Date()
						});

						image.save(function (err, a) {
							if (err) {
								signal.error("Failed to save " + file.name + " to database");
								throw err; // to-do: handle error gracefully
							}

							signal.success("Saved " + file.name + " to database");
							count++;

							if (count === files.images.length) {
								// to-do: update front end without refreshing page
								res.redirect('/master/gallery/' + req.params.category); // refresh page
							}
						});

						fs.unlink(file.path); // delete image in temp directory
					});
				});
			});
		}
	},

	putImage: function (req, res, next) {
		//
	},

	getIntro: function (req, res, next) {
		models.Intro.findOne({}, function (err, intro) {
			if (intro) {
				res.send(intro);
			} else {
				var failMsg = "Could not find intro";

				signal.error(failMsg);
				res.send(failMsg);
			}
		});
	},

	deleteImage: function (req, res, next) {
		models.Image.findOneAndRemove({
			category: req.params.category,
			title: req.params.title
		}, function (err, a) {
			if (err) {
				signal.error("Failed to delete " + req.params.title + " in database");
				throw err; // to-do: handle error gracefully
			}

			var successMsg = "Deleted " + req.params.title + " in database";

			signal.success(successMsg);
			res.send({
				msg: successMsg
			});
		});
	},

	getNews: function (req, res, next) {
		models.News
			.find({})
			.sort('-creationDate')
			.exec(function (err, news) {
				if (news.length) {
					res.send(news);
				} else {
					res.send([]);
				}
			});
	},

	postNews: function (req, res, next) {
		var news = new models.News({
			href: req.body.href,
			imageTitle: req.body.imageTitle,
			creationDate: req.body.creationDate
		});

		news.save(function (err, n) {
			if (err) {
				signal.error("Failed to save news: " + req.body.href + " to database");
				throw err; // to-do: handle error gracefully
			}

			var successMsg = "Saved news: " + req.body.href + " to database";

			signal.success(successMsg);
			res.send({
				msg: successMsg
			});
		});
	},

	putNews: function (req, res, next) {
		models.News.findOneAndUpdate({
			creationDate: req.body.creationDate // creationDate works as a unique identifier
		}, {
			href: req.body.href,
			imageTitle: req.body.imageTitle
		}, function (err, n) { // to-do: handle no matches
			if (err) {
				signal.error("Failed to update news: " + req.body.href + " in database");
				throw err; // to-do: handle error gracefully
			}

			var successMsg = "Updated news: " + req.body.href + " in database";

			signal.success(successMsg);
			res.send({
				msg: successMsg
			});
		});
	},

	deleteNews: function (req, res, next) {
		models.News.findOneAndRemove({
			imageTitle: req.params.imageTitle // to-do: use a unique identifier
		}, function (err, n) {
			if (err) {
				signal.error("Failed to delete news: " + req.params.imageTitle + " in database");
				throw err; // to-do: handle error gracefully
			}

			var successMsg = "Deleted news: " + req.params.imageTitle + " in database";

			signal.success(successMsg);
			res.send({
				msg: successMsg
			});
		});
	},

	getSkill: function (req, res, next) {
		models.Skill
			.find({})
			.sort('relevance')
			.exec(function (err, skills) {
				if (skills.length) {
					res.send(skills);
				} else {
					res.send([]);
				}
			});
	},

	getUser: function (req, res, next) {
		var name      = req.query.name.split(' ');
		var firstName = name.shift();
		var lastName  = name.pop();
		var answer    = req.query.answer;

		var selection = 'firstName lastName';
		var query     = {
			firstName: firstName && new RegExp(firstName, 'i') || '',
			lastName: lastName && new RegExp(lastName, 'i') || ''
		};

		if (answer) {
			query.answer = new RegExp(answer, 'i');
		} else {
			selection += ' question';
		}

		models.User
			.findOne(query)
			.select(selection)
			.exec(function (err, user) {
				if (user) {
					res.send(user);
				} else { // to-do: handle no matches properly
					res.status(404);
					res.send({
						msg: "User not found"
					});
				}
			});
	},

	getSpecial: function (req, res, next) {
		var name      = req.query.name.split(' ');
		var firstName = name.shift();
		var lastName  = name.pop();
		var answer    = req.query.answer;

		var query     = {
			firstName: firstName && new RegExp(firstName, 'i'),
			lastName: lastName && new RegExp(lastName, 'i'),
			answer: answer && new RegExp(answer, 'i')
		};

		models.User
			.findOne(query)
			.select('specialLetter')
			.exec(function (err, user) {
				if (user && user.specialLetter) {
					res.send(user.specialLetter);
				} else {
					res.status(404);
					res.send({
						msg: "Special letter not found"
					});
				}
			});
	}
};