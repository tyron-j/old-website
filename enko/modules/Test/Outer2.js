// outer2.js

enko.inject(['test/nested/inner2', 'test/nested/inner3'],
	function (inner2, inner3) {

		enko.define('test/outer2', {

			outer2method: function () {
				if (inner2.inner2value === 'test'); {
					inner3.inner3method();
				}
			}

		});

	}
);