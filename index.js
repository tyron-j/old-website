var express = require('express'),
	db = require('./utils/db'),
	signal = require('./utils/signal'),

	isLocalHost = process.env.LOCAL_HOST && JSON.parse(process.env.LOCAL_HOST),
	dbLogin = isLocalHost ? process.env.MASTER_LOGIN : process.env.GUEST_LOGIN,
	dbUri = process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', dbLogin),

	app = express();

// configure app
app.use(express.static(__dirname + '/public'));
app.set('port', (process.env.PORT || 9000));

app.get('/', function (req, res) {
	res.send("Tyron Jung's Node.js Website!");
});

// start app
app.listen(app.get('port'), function () {
	signal.success("Running at localhost:" + app.get('port'));

	// connect to db
	db.connect(dbUri);
});

// app closing logic
(function (closeApp) { // immediate function
	process.on('SIGINT', closeApp); // for localhost
	process.on('SIGTERM', closeApp); // for heroku cloud server
})(function () { // callback
	if (db.connection.readyState === 1) { // if connected
		db.connection.close(function () {
			process.exit();
		});
	} else {
		process.exit();
	}
});