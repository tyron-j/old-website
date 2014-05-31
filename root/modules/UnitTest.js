// UnitTest.js



Root.export('Root.UnitTest', Root.classify({
	
	initialize: function () {
		this.passedTests = 0;
	},

	methods: {
		breakTest: function () {
			// called on test fail; throws an error to block the test process
			throw new Error("test " + (this.passedTests + 1) + " failed");
		},

		assertTrue: function (statement) {
			if (statement === false) {
				this.breakTest();
			}
			this.passedTests++;
		},

		assertFalse: function (statement) {
			if (statement === true) {
				this.breakTest();
			}
			this.passedTests++;
		},

		assertSame: function (val1, val2) {
			if (val1 !== val2) {
				this.breakTest();
			}
			this.passedTests++;
		},

		assertEquals: function (val1, val2, recursion) {
			if (typeof val1 === 'object' && typeof val2 === 'object') {
				if (val1 instanceof Array && val2 instanceof Array) {
					if (val1.length !== val2.length) {
						this.breaktest();
					}
					for (var i = 0, l = val1.length; i < l; i++) {
						this.assertEquals(val1[i], val2[i], true);
					}
				} else {
					if (Object.keys(val1).length !== Object.keys(val2).length) {
						this.breakTest();
					}
					for (var key in val1) {
						if (!(key in val2)) {
							this.breakTest();
						}
						this.assertEquals(val1[key], val2[key], true);
					}
				}
			} else {
				if (val1 != val2) {
					this.breakTest();
				}
			}
			if (!recursion) {
				this.passedTests++;
			}
		},

		runTests: function (tests) {
			for (test in tests) {
				tests[test]();
			}
			console.info("unit tests successfully passed");
		}
	}

}));