// UnitTest.js



(function () {

	var UnitTest = Root.classify({
		
		initialize: function (module) {
			this.module = module;
		},

		methods: {
			get: function (method) {
				return this[method].bind(this);
			},

			breakTest: function () {
				// called on test fail; throws an error to block the test process
				throw new Error(UnitTest.prefix + ' ' + this.module + '.' + this.testee + ": test " + (this.passedTests + 1) + " failed");
			},

			assertTrue: function (statement) {
				if (statement !== true) {
					this.breakTest();
				}
				this.passedTests++;
			},

			assertFalse: function (statement) {
				if (statement !== false) {
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

			assertEquals: function (val1, val2, recursion) { // needs testing
				if (typeof val1 === 'object' && typeof val2 === 'object') {
					if (val1 instanceof Array && val2 instanceof Array) {
						if (val1.length !== val2.length) {
							this.breakTest();
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
					if (val1 !== val2) {
						this.breakTest();
					}
				}
				if (!recursion) {
					this.passedTests++;
				}
			},

			runTests: function (tests) {
				var successful = true;

				try {
					for (test in tests) {
						this.testee = test;
						this.passedTests = 0; // reset passed tests
						tests[test]();
					}
				} catch (e) {
					console.error(e.message);
					successful = false;
				}

				if (successful) {
					console.info(UnitTest.prefix + ' [' + this.module + "] successful");
				}
			}
		},

		statics: {
			prefix: '[unit test]'
		}

	});

	Root.export('UnitTest', UnitTest);
})();