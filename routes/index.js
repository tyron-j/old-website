module.exports = {
	index: function (req, res) {
		res.render('index');
	},
	partials: function (req, res) {
		// parameter may change; adjust accordingly
		res.render('partials/' + req.params.partial);
	}
};