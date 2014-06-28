// user.js



enko.inject(['utils'],
	function (utils) {

		enko.define('user', {

			name: 'guest',

			privileges: [],

			hasPrivilege: function (privilege) {
				utils.contains(this.privileges, privilege);
			}

		});

	}
);