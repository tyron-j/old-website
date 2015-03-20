// load modules
var express = require('express'),
	session = require('express-session'),
	bodyParser = require('body-parser'),
	passport = require('passport'),

	api = require('./app/routes/api'),
	auth = require('./app/utils/auth'),
	db = require('./app/utils/db'),
	routes = require('./app/routes'),
	signal = require('./app/utils/signal'),

	// temporary db login logic
	isLocalHost = process.env.LOCAL_HOST && JSON.parse(process.env.LOCAL_HOST),
	dbLogin = isLocalHost ? process.env.MASTER_LOGIN : process.env.GUEST_LOGIN,
	dbUri = process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', dbLogin),

	app = express();

// configure app
app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + '/public')); // app client runs in /public directory
app.use(bodyParser.urlencoded({ extended: true })); // required for passport
app.use(bodyParser.json()); // required for passport

// to-do: understand and configure this correctly
app.use(session({
	secret: 'keyboard cat', // to-do: put the secret in an env variable
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use(function (req, res, next) {
	// to-do: only allow api usage when req header is valid; use environment variable
	next();
});

// api
app.get('/api/image', api.getImage);
app.post('/api/login', auth(process.env.MASTER_LOGIN, '/success', '/fail'));

// routes
app.get('/partials/:partial', routes.partials);
app.get('*', routes.index(isLocalHost)); // solves angular page refresh issue; must be the last route

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