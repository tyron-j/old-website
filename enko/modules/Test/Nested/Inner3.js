// inner3.js

enko.inject(['test/outer3'],
	function (outer3) {
		enko.define('test/nested/inner3', {
			
			inner3method: function () {
				outer3.outer3method();
			}

		});
	}
);