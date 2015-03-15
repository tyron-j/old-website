var express = require('express');
var app = express();

// db logic

var mongoose = require('mongoose'),
	db;

mongoose.connect(process.env.MONGOLAB_URI);
db = mongoose.connection;

// end of db logic

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.send(Object.keys(db));
});

app.listen(app.get('port'), function () {
	console.log("App running at localhost:" + app.get('port'));
});