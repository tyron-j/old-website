// Inner3 module

Root.import(['Root.Test.Outer3'],
	function (Outer3) {
		Root.export('Root.Test.Nested.Inner3', {
			
			inner3method: function () {
				Outer3.outer3method();
			}

		});
	}
);