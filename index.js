var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.send("Tyron Jung's Node.js Website!");
});

app.listen(app.get('port'), function () {
	console.log("App running at localhost:" + app.get('port'));
});