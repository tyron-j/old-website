// to-do: abstract color logging logic

var fs = require('fs'),
	express = require('express'),
	mongoose = require('mongoose'),
	colors = require('colors/safe'),

	app = express(),
	Schema = mongoose.Schema;

// database connection callbacks
mongoose.connection.on('connected', function () {
	console.log(colors.green("Successfully connected to database"));
}).on('error', function (err) {
	console.error(colors.red("Failed to connect to database: " + err.errmsg));
});

// testing image storage
/*var schema = new Schema({
	img: {
		data: Buffer,
		contentType: String
	}
});

var A = mongoose.model('A', schema);

mongoose.connection.on('open', function () {
	console.log(colors.green("Successfully opened database"));

	A.remove(function (err) { // why remove? check what omitting this does; probably empties collection each time
		if (err) {
			throw err;
		}

		console.log("Removed old docs");

		var a = new A;
		a.img.data = fs.readFileSync('/img/test.jpg');
		a.img.contentType = 'image/jpg';
		a.save(function (err, a) {
			if (err) {
				throw err;
			}

			console.log("Saved image to database");
		});
	})
});*/

// connect to database
if (process.env.LOCAL_HOST && JSON.parse(process.env.LOCAL_HOST)) {
	console.log(colors.yellow("Connecting to database as master"));
	mongoose.connect(process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', process.env.MASTER_LOGIN));
} else {
	console.log(colors.yellow("Connecting to database as guest"));
	mongoose.connect(process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', process.env.GUEST_LOGIN));
}

// configure app
app.set('port', (process.env.PORT || 9000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.send("Tyron Jung's Node.js Website!");
});

// start app
app.listen(app.get('port'), function () {
	console.log(colors.green("Running at localhost:" + app.get('port')));
});

// app closing logic
(function (closeApp) { // immediate function
	process.on('SIGINT', closeApp); // for localhost
	process.on('beforeExit', closeApp); // for heroku cloud server; check logs to see if this works
})(function () { // callback
	mongoose.connection.close(function () {
		console.log(colors.green("Disconnected from database"));
		process.exit();
	});
});