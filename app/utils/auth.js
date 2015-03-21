// authentication

var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function (correctLogin, successRedirect, failureRedirect) {
	var correctUsername;
	var correctPassword;

	correctLogin    = correctLogin.split(':');
	correctUsername = correctLogin[0];
	correctPassword = correctLogin[1];

	passport.use(new LocalStrategy(function (username, password, done) {
		if (username !== correctUsername) {
			return done(null, false, { message: "Incorrect username" });
		}

		if (password !== correctPassword) {
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