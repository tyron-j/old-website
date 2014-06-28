// outer1.js

enko.inject(['test/outer2', 'test/nested/inner1', 'test/nested/inner2'],
	function (outer2, inner1, inner2) {

		enko.define('test/outer1', {

		  outer1method: function () {
		  	if (inner1.inner1value === inner2.inner2value) {
		     	outer2.outer2method();
		     }
		  }

		});

	}
);