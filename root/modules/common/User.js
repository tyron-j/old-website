// User.js



Root.import(['Utils'],
	function (Utils) {

		Root.export('User', {

			name: 'guest',

			privileges: [],

			hasPrivilege: function (privilege) {
				Utils.contains(this.privileges, privilege);
			}

		});

	}
);