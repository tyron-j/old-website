// routes

module.exports = {
	// called for everything other than api
	// ex. /login will load the index, which then calls '/partials/login'
	index: function (isLocalHost) {
		return function (req, res, next) {
			res.render('index', { isLocalHost: isLocalHost });
		};
	},

	// putting a / in front of partial locations causes a crash
	partials: function (req, res, next) {
		res.render('partials/' + req.params.partial);
	},
	
	masterPartials: function (req, res, next) {
		res.render('partials/master/' + req.params.partial);
	},

	widgets: function (req, res, next) {
		res.render('widgets/' + req.params.widget);
	}
};