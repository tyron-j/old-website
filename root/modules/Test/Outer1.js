// Outer1.js

Root.import(['Root.Test.Outer2', 'Root.Test.Nested.Inner1', 'Root.Test.Nested.Inner2'],
	function (Outer2, Inner1, Inner2) {

		Root.export('Root.Test.Outer1', {

		  outer1method: function () {
		  	if (Inner1.inner1value === Inner2.inner2value) {
		     	Outer2.outer2method();
		     }
		  }

		});

	}
);