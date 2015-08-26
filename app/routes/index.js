// routes

var location     = require('../utils/location');
var isLocalHost  = location.isLocalHost;
var locationHost = isLocalHost ? 'localhost:9000' : 'tyronjung.com';

module.exports = {
	// called for everything other than api
	// ex. /login will load the index, which then calls '/partials/login'
	index: function (req, res, next) {
		res.render('index', { isLocalHost: isLocalHost });
	},

	// putting a / in front of partial locations causes a crash
	partials: function (req, res, next) {
		res.render('partials/' + req.params.partial, { locationHost: locationHost });
	},
	
	masterPartials: function (req, res, next) {
		res.render('partials/master/' + req.params.partial, { locationHost: locationHost });
	},

	testsPartials: function (req, res, next) {
		res.render('partials/tests/' + req.params.partial, { locationHost: locationHost });
	},

	widgets: function (req, res, next) {
		res.render('widgets/' + req.params.widget, { locationHost: locationHost });
	}
};