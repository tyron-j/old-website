// test for widget.js



enko.inject(['ui/widget', 'unittest'],
	function (Widget, UnitTest) {
		'use strict';
		
		var ut = new UnitTest('ui/widget'),

			// shortcuts
			assertTrue = ut.get('assertTrue'),
			assertFalse = ut.get('assertFalse'),
			assertEquals = ut.get('assertEquals'),
			assertSame = ut.get('assertSame');

		// tests
		ut.runTests({

			// animation:

			animate: function () {
				//
			},

			// events:

			handle: function () {
				//
			},

			ignore: function () {
				//
			},

			trigger: function () {
				//
			},

			// dom manipulation:

			addClass: function () {
				//
			},

			configure: function () {
				//
			},

			destroy: function () {
				//
			},

			insertAfter: function () {
				//
			},

			stylize: function () {
				//
			}

		});
		
	}
);