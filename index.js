var express = require('express'),
	mongoose = require('mongoose'),

	signal = require('./utils/signal'),

	app = express();

// database connection callbacks
mongoose.connection.on('connected', function () {
	signal.success("Successfully connected to database");
}).on('error', function (err) {
	signal.error("Failed to connect to database: " + err.errmsg);
});

// connect to database
if (process.env.LOCAL_HOST && JSON.parse(process.env.LOCAL_HOST)) {
	signal.progress("Connecting to database as master");
	mongoose.connect(process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', process.env.MASTER_LOGIN));
} else {
	signal.progress("Connecting to database as guest");
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
	signal.success("Running at localhost:" + app.get('port'));
});

// app closing logic
(function (closeApp) { // immediate function
	process.on('SIGINT', closeApp); // for localhost
	process.on('SIGTERM', closeApp); // for heroku cloud server; check logs to see if this works
})(function () { // callback
	if (mongoose.connection.readyState === 1) { // if connected
		mongoose.connection.close(function () {
			signal.success("Disconnected from database");
			process.exit();
		});
	} else {
		process.exit();
	}
});