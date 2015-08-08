// update

// dependencies
var fs     = require('fs');
var db     = require('./app/utils/db');
var signal = require('./app/utils/signal');

// models
var Experience = require('./app/models/experience');
var Intro      = require('./app/models/intro');
var Skill      = require('./app/models/skill');

// variables
var uploadDir = __dirname + '/app/update';
var status    = {
	experience: {
		doneUpdating: false,
		numCompleted: 0,
		numTotal: null
	},

	intro: {
		doneUpdating: false,
		numCompleted: 0,
		numTotal: 1
	},

	skill: {
		doneUpdating: false,
		numCompleted: 0,
		numTotal: null
	}
};

// functions
var closeApp = function () {
	if (db.connection.readyState === 1) { // if connected
		db.connection.close(function () {
			process.exit();
		});
	} else {
		process.exit();
	}
};

var updateStatus = function (model, numTotal) {
	if (status[model].numTotal === null && numTotal) {
		status[model].numTotal = numTotal;
	} else {
		status[model].numCompleted++;

		if (status[model].numCompleted === status[model].numTotal) {
			status[model].doneUpdating = true;
			signal.success("Done updating " + model + "s");

			if (status.experience.doneUpdating && status.intro.doneUpdating && status.skill.doneUpdating) {
				closeApp();
			}
		}
	}
};

// connect to db
db.connect(process.env.MONGOLAB_URI);

// upon connection
db.connection.on('connected', function () {
	// update experiences
	fs.readFile(uploadDir + '/experiences.json', function (err, data) {
		if (err) {
			signal.error("Failed to read experiences");
			throw err; // to-do: handle error gracefully
		}

		Experience.remove({}, function (err) {
			if (err) {
				signal.error("Failed to delete experiences in database");
				throw err; // to-do: handle error gracefully
			}

			signal.success("Deleted experiences in database");

			var exps = JSON.parse(data);

			updateStatus('experience', exps.length);

			exps.forEach(function (exp, idx) {
				exp.relevance = idx;

				(new Experience(exp)).save(function (err, e) {
					if (err) {
						signal.error("Failed to save experience to database");
						throw err; // to-do: handle error gracefully
					}

					signal.success("Saved experience to database");
					updateStatus('experience');
				});
			});
		});
	});

	// update intro
	fs.readFile(uploadDir + '/intro.txt', function (err, data) {
		if (err) {
			signal.error("Failed to read intro");
			throw err; // to-do: handle error gracefully
		}

		Intro.remove({}, function (err) {
			if (err) {
				signal.error("Failed to delete intro in database");
				throw err; // to-do: handle error gracefully
			}

			signal.success("Deleted intro in database");

			var intro = new Intro({
				content: data
			});

			intro.save(function (err, i) {
				if (err) {
					signal.error("Failed to save intro to database");
					throw err; // to-do: handle error gracefully
				}

				signal.success("Saved intro to database");
				updateStatus('intro');
			})
		});
	});

	// update skills
	fs.readFile(uploadDir + '/skills.json', function (err, data) {
		if (err) {
			signal.error("Failed to read skills");
			throw err; // to-do: handle error gracefully
		}

		Skill.remove({}, function (err) {
			if (err) {
				signal.error("Failed to delete skills in database");
				throw err; // to-do: handle error gracefully
			}

			signal.success("Deleted skills in database");

			var skills = JSON.parse(data);

			updateStatus('skill', skills.length);

			skills.forEach(function (skl, idx) {
				skl.relevance = idx;

				(new Skill(skl)).save(function (err, s) {
					if (err) {
						signal.error("Failed to save skill to database");
						throw err; // to-do: handle error gracefully
					}

					signal.success("Saved skill to database");
					updateStatus('skill');
				});
			});
		});
	});
});

// close
process.on('SIGINT', closeApp);