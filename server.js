// server

// dependencies ============================================================= //

var express    = require('express');
var bodyParser = require('body-parser');
var fs         = require('fs');

var db       = require('./app/utils/db');
var location = require('./app/utils/location');
var signal   = require('./app/utils/signal');

var api    = require('./app/routes/api');
var routes = require('./app/routes');

// temporary db login logic
var isLocalHost = location.isLocalHost;
var dbLogin     = isLocalHost ? process.env.MASTER_LOGIN : process.env.GUEST_LOGIN;
var dbUri       = process.env.MONGOLAB_URI.replace('<dbuser>:<dbpassword>', dbLogin);

var app = module.exports = express();

// configuration ============================================================ //

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.set('port', (process.env.PORT || 9000));

app.use(express.static(__dirname + '/public')); // client runs in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// middleware =============================================================== //

app.use(function (req, res, next) {
	// to-do: use env variable to protect api usage
	next();
});

// api ====================================================================== //

// unprotected api
app.get('/api/blog', api.getBlog); // fetch titles
app.get('/api/blog/:title', api.getBlog); // fetch actual blog
app.get('/api/experience', api.getExperience);
app.get('/api/image/:category', api.getImage); // fetch titles
app.get('/api/image/:category/:title', api.getImage); // fetch actual image
app.get('/api/intro', api.getIntro);
app.get('/api/news', api.getNews);
app.get('/api/skill', api.getSkill);
app.get('/api/special', api.getSpecial);
app.get('/api/user', api.getUser);

// temporary middleware to protect api and master views
app.use('/api/*', api.authenticate(isLocalHost));
app.use('*/master/*', api.authenticate(isLocalHost)); // also protects partials

// protected api
app.post('/api/blog', api.postBlog);
app.post('/api/image/:category', api.postImage(__dirname + '/app/temp'));
app.post('/api/news', api.postNews);

app.put('/api/blog', api.putBlog);
app.put('/api/image', api.putImage);
app.put('/api/news', api.putNews);

app.delete('/api/blog/:title', api.deleteBlog);
app.delete('/api/image/:category/:title', api.deleteImage);
app.delete('/api/news/:imageTitle', api.deleteNews);

// routes =================================================================== //

app.get('/partials/:partial', routes.partials);
app.get('/partials/master/:partial', routes.masterPartials);
app.get('/partials/tests/:partial', routes.testsPartials);
app.get('/widgets/:widget', routes.widgets);

// solves angular page refresh issue
// redirects every other request to index
// must be added last
app.get('*', routes.index);

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

// cleanup ================================================================== //

if (isLocalHost) {
	var tempDir = __dirname + '/app/temp/';

	fs.readdir(tempDir, function (err, files) {
		if (err) {
			// to-do: handle error gracefully
		}

		if (files.length) {
			files.forEach(function (file) {
				fs.unlink(tempDir + file, function (err) {
					if (err) {
						// to-do: handle error gracefully
					}
				});
			});
		}
	});
}