// test for uix.js



enko.inject(['uix', 'unittest'],
	function (uix, UnitTest) {
		
		var ut = new UnitTest('uix'),

			// shortcuts
			assertTrue = ut.get('assertTrue'),
			assertFalse = ut.get('assertFalse'),
			assertEquals = ut.get('assertEquals'),
			assertSame = ut.get('assertSame');

		// tests
		ut.runTests({

			manifest: function () {
				uix.manifest();
			}

		});
		
	}
);