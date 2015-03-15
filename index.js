var express = require('express'),
	mongoose = require('mongoose'),

	app = express();

/*if (process.env.LOCAL_HOST) {
	mongoose.connect(process.env.MONGOLAB_URI.replace("<dbuser>:<dbpassword>", process.env.MASTER_LOGIN));
} else {
	mongoose.connect(process.env.MONGOLAB_URI.replace("<dbuser>:<dbpassword>", process.env.GUEST_LOGIN));
}*/

app.set('port', (process.env.PORT || 9000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.send(Object.keys(process.env));
});

app.listen(app.get('port'), function () {
	console.log("App running at localhost:" + app.get('port'));
});