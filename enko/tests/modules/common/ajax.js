// test for ajax.js



enko.inject(['ajax', 'unittest'],
	function (ajax, UnitTest) {
		'use strict';
		
		var ut = new UnitTest('ajax'),

			// shortcuts
			assertTrue = ut.get('assertTrue'),
			assertFalse = ut.get('assertFalse'),
			assertEquals = ut.get('assertEquals'),
			assertSame = ut.get('assertSame');

		// tests
		ut.runTests({

			get: function () { // to-do: make this more thorough
				ajax.get('data/get.txt', null, false).onSuccess(function (res) {
					assertSame(res, 'information retrieved via AJAX');
				}).onWhatever(function (res) {
					assertSame(res, 'information retrieved via AJAX');
				});
			},

			post: function () {
				//
			},

			put: function () {
				//
			}

		});
		
	}
);