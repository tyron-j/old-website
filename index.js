var express = require('express'),
	mongoose = require('mongoose'),

	app = express();

// database connection callbacks
mongoose.connection.on('connected', function () {
	console.log("Successfully connected to database");
}).on('error', function (err) {
	console.error("Failed to connect to database: " + err.errmsg);
});

// connect to database
if (process.env.LOCAL_HOST && JSON.parse(process.env.LOCAL_HOST)) {
	console.log("Connecting to database as master");
	mongoose.connect(process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', process.env.MASTER_LOGIN));
} else {
	console.log("Connecting to database as guest");
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
	console.log("Running at localhost:" + app.get('port'));
});