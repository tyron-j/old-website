// Inner3.js

enko.inject(['Test/Outer3'],
	function (Outer3) {
		enko.define('Test/Nested/Inner3', {
			
			inner3method: function () {
				Outer3.outer3method();
			}

		});
	}
);