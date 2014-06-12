// Inner3.js

Root.import(['Test/Outer3'],
	function (Outer3) {
		Root.export('Test/Nested/Inner3', {
			
			inner3method: function () {
				Outer3.outer3method();
			}

		});
	}
);