module.exports = {
	// called for everything other than api
	// ex. /login will load the index, which then calls '/partials/login'
	index: function (isLocalHost) {
		return function (req, res, next) {
			res.render('index', { isLocalHost: isLocalHost });
		};
	},
	partials: function (req, res, next) {
		res.render('partials/' + req.params.partial);
	}
};