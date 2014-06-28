// User.js



enko.inject(['Utils'],
	function (Utils) {

		enko.define('User', {

			name: 'guest',

			privileges: [],

			hasPrivilege: function (privilege) {
				Utils.contains(this.privileges, privilege);
			}

		});

	}
);