// database

var mongoose = require('mongoose');
var signal   = require('./signal');

mongoose.connection.on('connecting', function () {
	// signal.progress("Connecting to database as: " + mongoose.connection.user);
}).on('connected', function () {
	signal.success("Connected to database");
}).on('disconnecting', function () {
	// signal.progress("Disconnecting from database");
}).on('disconnected', function () {
	signal.success("Disconnected from database");
}).on('error', function (err) {
	signal.error("Failed to connect to database: " + err.errmsg);
});

module.exports = mongoose;