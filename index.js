var express = require('express'),
	mongoose = require('mongoose'),
	app = express();

mongoose.connect(process.env.MONGOLAB_URI);
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.send("Tyron Jung's Node.js Website!");
});

app.listen(app.get('port'), function () {
	console.log("App running at localhost:" + app.get('port'));
});