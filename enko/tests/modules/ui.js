// test for ui.js



enko.inject(['ui', 'unittest'],
	function (ui, UnitTest) {
		
		var ut = new UnitTest('ui'),

			// shortcuts
			assertTrue = ut.get('assertTrue'),
			assertFalse = ut.get('assertFalse'),
			assertEquals = ut.get('assertEquals'),
			assertSame = ut.get('assertSame');

		// tests
		ut.runTests({

			manifest: function () {
				ui.manifest();
			}

		});
		
	}
);