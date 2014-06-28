// Outer1.js

enko.inject(['Test/Outer2', 'Test/Nested/Inner1', 'Test/Nested/Inner2'],
	function (Outer2, Inner1, Inner2) {

		enko.define('Test/Outer1', {

		  outer1method: function () {
		  	if (Inner1.inner1value === Inner2.inner2value) {
		     	Outer2.outer2method();
		     }
		  }

		});

	}
);