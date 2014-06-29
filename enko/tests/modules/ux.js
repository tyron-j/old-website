// test for ux.js



enko.inject(['ux', 'unittest'],
	function (ux, UnitTest) {
		
		var ut = new UnitTest('ux'),

			// shortcuts
			assertTrue = ut.get('assertTrue'),
			assertFalse = ut.get('assertFalse'),
			assertEquals = ut.get('assertEquals'),
			assertSame = ut.get('assertSame');

		// tests
		ut.runTests({

			manifest: function () {
				ux.manifest();
			}

		});
		
	}
);