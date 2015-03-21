// signal

var colors = require('colors/safe');

module.exports = {
	success: function (str) {
		console.log(colors.green(str));
	},
	progress: function (str) {
		console.log(colors.yellow(str));
	},
	error: function (str) {
		console.log(colors.red(str));
	}
};