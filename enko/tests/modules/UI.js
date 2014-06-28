// test for UI.js



enko.inject(['UI', 'UnitTest'],
	function (UI, UnitTest) {
		
		var UT = new UnitTest('UI'),

			// shortcuts
			assertTrue = UT.get('assertTrue'),
			assertFalse = UT.get('assertFalse'),
			assertEquals = UT.get('assertEquals'),
			assertSame = UT.get('assertSame');

		// tests
		UT.runTests({

			manifest: function () {
				UI.manifest();
			}

		});
		
	}
);