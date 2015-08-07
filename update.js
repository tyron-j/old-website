// update

// dependencies
var fs     = require('fs');
var db     = require('./app/utils/db');
var signal = require('./app/utils/signal');

// models
var Intro      = require('./app/models/intro');
var Skill      = require('./app/models/skill');
var Experience = require('./app/models/experience');

// variables
var uploadDir = __dirname + '/app/temp';

// connect to db
db.connect(process.env.MONGOLAB_URI);

// upon connection
db.connection.on('connected', function () {
	fs.readFile(uploadDir + '/intro.txt', function (err, data) {
		if (err) {
			signal.error("Failed to read intro");
			throw err; // to-do: handle error gracefully
		}

		Intro.remove({}, function (err) {
			if (err) {
				signal.error("Failed to delete intro");
				throw err; // to-do: handle error gracefully
			}

			var intro = new Intro({
				content: data
			});

			intro.save(function (err, i) {
				if (err) {
					signal.error("Failed to save intro");
					throw err; // to-do: handle error gracefully
				}

				signal.success("Saved intro");
			})
		})
	});
});

// close
(function (closeApp) { // immediate function
	process.on('SIGINT', closeApp);
})(function () { // callback
	if (db.connection.readyState === 1) { // if connected
		db.connection.close(function () {
			process.exit();
		});
	} else {
		process.exit();
	}
});