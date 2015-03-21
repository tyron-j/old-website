// server

// dependencies ============================================================= //

var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var passport   = require('passport');

var auth   = require('./app/utils/auth');
var config = require('./app/utils/config');
var db     = require('./app/utils/db');
var signal = require('./app/utils/signal');

var api    = require('./app/routes/api');
var routes = require('./app/routes');

// temporary db login logic
var isLocalHost = process.env.LOCAL_HOST && JSON.parse(process.env.LOCAL_HOST);
var dbLogin     = isLocalHost ? process.env.MASTER_LOGIN : process.env.GUEST_LOGIN;
var dbUri       = process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', dbLogin);

var app = express();

// configuration ============================================================ //

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + '/public')); // client runs in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session(config.session));
app.use(passport.initialize());
app.use(passport.session());

// middleware =============================================================== //

app.use(function (req, res, next) {
	// to-do: use env variable to protect api usage
	next();
});

// api ====================================================================== //

app.get('/api/image', api.getImage);

app.post('/api/login', auth(dbLogin, '/success', '/fail'));

// routes =================================================================== //

app.get('/partials/:partial', routes.partials);

// solves angular page refresh issue
// redirects every other request to index
// must be added last
app.get('*', routes.index(isLocalHost));

// launch =================================================================== //

app.listen(app.get('port'), function () {
	signal.success("Running at localhost:" + app.get('port'));
	db.connect(dbUri);
});

// close ==================================================================== //

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