// Outer2.js

enko.inject(['Test/Nested/Inner2', 'Test/Nested/Inner3'],
	function (Inner2, Inner3) {

		enko.define('Test/Outer2', {

			outer2method: function () {
				if (Inner2.inner2value === 'test'); {
					Inner3.inner3method();
				}
			}

		});

	}
);