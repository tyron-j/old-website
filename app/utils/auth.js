// authentication

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (masterLogin, successRedirect, failureRedirect) {
	var masterUsername;
	var masterPassword;

	masterLogin    = masterLogin.split(':');
	masterUsername = masterLogin[0];
	masterPassword = masterLogin[1];

	passport.use(new LocalStrategy(function (username, password, done) {
		if (username !== masterUsername) {
			return done(null, false, { message: "Incorrect username" });
		}

		if (password !== masterPassword) {
			return done(null, false, { message: "Incorrect password" });
		}

		return done(null, {
			name: username
		});
	}));

	// to-do: understand and configure this correctly
	passport.serializeUser(function (user, done) {
		done(null, user.name)
	});

	// to-do: understand and configure this correctly
	passport.deserializeUser(function (user, done) {
		done(null, user)
	});

	return passport.authenticate('local', {
		successRedirect: successRedirect,
		failureRedirect: failureRedirect
	});
}