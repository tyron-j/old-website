// unittest.js

// to-do: show the actual tested value in the GUI

(function () {
	var utContainer = document.getElementById('ut-container'), // GUI; to-do: consider creating the elements here
		utSuccessful = document.getElementById('ut-successful');

	var UnitTest = enko.classify({
		
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
				var successful = true,
					currentTest; // GUI

				try {
					for (var test in tests) {
						this.testee = test;
						currentTest = tests[test]; // GUI
						this.passedTests = 0; // reset passed tests

						tests[test]();
					}
				} catch (e) {
					successful = false;

					console.error(e.message);
					this.parseTest(currentTest); // GUI
				}

				if (successful) {
					console.info(UnitTest.prefix + ' [' + this.module + "] successful");
				}
			},

			parseTest: function (test) { // GUI
				if (utContainer) {
					var utHeader = document.createElement('div'),
						utContent = document.createElement('div'),
						testStr = test.toString(),
						tabsLength = testStr.match(/\n\t+/)[0].match(/\t/g).length,
						tabsRegExp = '\\n',

						that = this,
						counter = 0;

					utHeader.classList.add('ut-header');
					utContent.classList.add('ut-content');
					
					if (utSuccessful.parentElement) {
						utSuccessful.parentElement.removeChild(utSuccessful);
					}

					for (var i = 0; i < tabsLength; i++) {
						tabsRegExp += '\\t';
					}

					tabsRegExp = new RegExp(tabsRegExp, 'g');

					testStr = testStr.replace(/assert[^\;]+\;/g, function (match) {
						if (counter === that.passedTests) {
							counter = null;

							return '<span style = \'color: red;\'>' + match + '</span>';
						}

						if (counter !== null) {
							counter++;

							return '<span style = \'color: limegreen;\'>' + match + '</span>';
						}

						return match;
					});

					utHeader.innerHTML = "<span style = 'color: red;'>unit test failed:</span> " + this.module + "." + this.testee;
					utContent.innerHTML = testStr.replace(/\t+}$/, '}').replace(tabsRegExp, '\n&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;').replace(/\n/g, '<br>');

					utContainer.appendChild(utHeader);
					utContainer.appendChild(utContent);
				}
			}
		},

		statics: {
			prefix: '[unit test]'
		}

	});

	enko.define('unittest', UnitTest);
})();