// unittest.js

// to-do: show the actual tested value in the GUI

enko.inject(['utils'],
	function (utils) {

		var utContainer = document.getElementById('ut-container'), // GUI; to-do: consider creating the elements here
			utSuccessful = document.getElementById('ut-successful');

		function formatStr(item) { // needs testing
			if (utils.isArray(item)) {
				return '[' + item.join(', ') + ']';
			} else if (utils.isElement(item)) {
				return item.outerHTML;
			} else if (utils.isObject(item)) {
				return JSON.stringify(item, null, 4);
			} else {
				return item;
			}
		}

		var UnitTest = enko.classify({
			
			initialize: function (module) {
				this.module = module;
			},

			methods: {
				get: function (method) {
					return this[method].bind(this);
				},

				breakTest: function (actual, expected) {
					// called on test fail; throws an error to block the test process
					throw {
						actual: formatStr(actual),
						expected: formatStr(expected),
						message: UnitTest.prefix + ' ' + this.module + '.' + this.testee + ": test " + (this.passedTests + 1) + " failed"
					};
				},

				assertTrue: function (statement) {
					if (statement !== true) {
						this.breakTest(statement, true);
					}
					this.passedTests++;
				},

				assertFalse: function (statement) {
					if (statement !== false) {
						this.breakTest(statement, false);
					}
					this.passedTests++;
				},

				assertSame: function (actual, expected) {
					if (actual !== expected) {
						this.breakTest(actual, expected);
					}
					this.passedTests++;
				},

				assertEquals: function (actual, expected, recursion) { // to-do: use utils validators
					if (utils.isArray(actual) && utils.isArray(expected)) { // to-do: implement utils.areArrays?
						if (actual.length !== expected.length) {
							this.breakTest(actual, expected);
						}

						for (var i = 0, l = actual.length; i < l; i++) {
							this.assertEquals(actual[i], expected[i], true);
						}
					} else if (utils.isObject(actual) && utils.isObject(expected)) { // to-do: implement utils.areObjects?
						if (Object.keys(actual).length !== Object.keys(expected).length) {
							this.breakTest(actual, expected);
						}

						for (var key in actual) {
							if (!(key in expected)) {
								this.breakTest(actual, expected);
							}
							this.assertEquals(actual[key], expected[key], true);
						}
					} else {
						if (actual !== expected) {
							this.breakTest(actual, expected);
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

						console.error(e.message + "\n\nactual: " + e.actual + "\n\nexpected: " + e.expected);
						this.parseTest(currentTest); // GUI
					}

					if (successful) {
						console.info(UnitTest.prefix + " [" + this.module + "] successful");
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
	}

);