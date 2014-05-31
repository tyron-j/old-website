// Outer2 module

Root.import(['Root.Test.Nested.Inner2', 'Root.Test.Nested.Inner3'],
	function (Inner2, Inner3) {

		Root.export('Root.Test.Outer2', {

			outer2method: function () {
				if (Inner2.inner2value === 'test'); {
					Inner3.inner3method();
				}
			}

		});

	}
);