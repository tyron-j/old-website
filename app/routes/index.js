module.exports = {
	index: function (isLocalHost) {
		return function (req, res) {
			res.render('index', { isLocalHost: isLocalHost });
		};
	},
	partials: function (req, res) {
		// parameter may change; adjust accordingly
		res.render('partials/' + req.params.partial);
	}
};