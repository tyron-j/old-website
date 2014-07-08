// test for utils.js



enko.inject(['utils', 'unittest'],
	function (utils, UnitTest) {
		'use strict';
		
		var ut = new UnitTest('utils'),

			// shortcuts
			assertTrue = ut.get('assertTrue'),
			assertFalse = ut.get('assertFalse'),
			assertEquals = ut.get('assertEquals'),
			assertSame = ut.get('assertSame');

		// tests
		ut.runTests({

			occupy: function () {
				var obj1 = {
						key1: 'val1',
						key3: 'val3'
					},
					obj2 = {
						key1: '_val1',
						key2: '_val2',
						key3: '_val3'
					},
					obj;

				obj = utils.occupy([obj1, obj2]);

				assertSame(obj, obj1);
				assertEquals(obj1, {
					key1: 'val1',
					key2: '_val2',
					key3: 'val3'
				});

				// recursive

				var obj3 = {
						key1: 'val1',
						key2: 'val2',
						inner1: {
							key1: 'val1',
							key3: 'val3'
						},
						inner2: {
							key1: 'val1'
						}
					},
					obj4 = {
						key1: '_val1',
						key2: '_val2',
						key3: '_val3',
						inner1: {
							key1: '_val1',
							key2: '_val2',
							key3: '_val3'
						},
						inner2: [1, 2, 3]
					};

				obj = utils.occupy([obj3, obj4], true);

				assertSame(obj, obj3);
				assertEquals(obj3, {
					key1: 'val1',
					key2: 'val2',
					key3: '_val3',
					inner1: {
						key1: 'val1',
						key2: '_val2',
						key3: 'val3'
					},
					inner2: {
						key1: 'val1'
					}
				});
			},

			merge: function () {
				var obj1 = {
						key1: 'val1',
						key2: 'val2',
						key3: 'val3'
					},
					obj2 = {
						key1: '_val1',
						key3: '_val3'
					},
					obj3 = {
						key1: 'val1',
						key2: '_val2',
						key4: [1, 2, 3, {
							key1: 'val1'
						}]
					},
					obj;

				obj = utils.merge([obj1, obj2]);

				assertSame(obj, obj1);
				assertEquals(obj, {
					key1: '_val1',
					key2: 'val2',
					key3: '_val3'
				});

				obj = utils.merge([{}, obj2, obj3]);

				assertEquals(obj, {
					key1: 'val1',
					key2: '_val2',
					key3: '_val3',
					key4: [1, 2, 3, {
						key1: 'val1'
					}]
				});

				// recursive

				var obj4 = {
						key1: 'val1',
						key2: 'val2',
						key3: 'val3',
						inner1: {
							key1: 'val1',
							key2: 'val2',
							key3: 'val3',
							inner2: {
								key1: 'val1',
								key2: 'val2',
								key3: 'val3',
								inner3: {
									key1: 'val1'
								}
							}
						}
					},
					obj5 = {
						key1: '_val1',
						inner1: {
							key2: '_val2',
							inner2: {
								key3: '_val3',
								inner3: [1, 2, 3]
							}
						}
					};

				obj = utils.merge([obj4, obj5], true);

				assertSame(obj, obj4);
				assertEquals(obj4, {
					key1: '_val1',
					key2: 'val2',
					key3: 'val3',
					inner1: {
						key1: 'val1',
						key2: '_val2',
						key3: 'val3',
						inner2: {
							key1: 'val1',
							key2: 'val2',
							key3: '_val3',
							inner3: [1, 2, 3]
						}
					}
				});
			},

			isElement: function () {
				assertTrue(utils.isElement(document.createElement('div')));
				assertFalse(utils.isElement([]));
				assertFalse(utils.isElement(function(){}));
				assertFalse(utils.isElement({}));
				assertFalse(utils.isElement(/test/));
				assertFalse(utils.isElement(true));
				assertFalse(utils.isElement(0));
				assertFalse(utils.isElement('test'));
				assertFalse(utils.isElement(undefined));
			},

			isArray: function () {
				assertFalse(utils.isArray(document.createElement('div')));
				assertTrue(utils.isArray([]));
				assertFalse(utils.isArray(function(){}));
				assertFalse(utils.isArray({}));
				assertFalse(utils.isArray(/test/));
				assertFalse(utils.isArray(true));
				assertFalse(utils.isArray(0));
				assertFalse(utils.isArray('test'));
				assertFalse(utils.isArray(undefined));
			},

			isFunction: function () {
				assertFalse(utils.isFunction(document.createElement('div')));
				assertFalse(utils.isFunction([]));
				assertTrue(utils.isFunction(function(){}));
				assertFalse(utils.isFunction({}));
				assertFalse(utils.isFunction(/test/));
				assertFalse(utils.isFunction(true));
				assertFalse(utils.isFunction(0));
				assertFalse(utils.isFunction('test'));
				assertFalse(utils.isFunction(undefined));
			},

			isObject: function () {
				assertFalse(utils.isObject(document.createElement('div')));
				assertFalse(utils.isObject([]));
				assertFalse(utils.isObject(function(){}));
				assertTrue(utils.isObject({}));
				assertFalse(utils.isObject(/test/));
				assertFalse(utils.isObject(true));
				assertFalse(utils.isObject(0));
				assertFalse(utils.isObject('test'));
				assertFalse(utils.isObject(undefined));
			},

			isRegExp: function () {
				assertFalse(utils.isRegExp(document.createElement('div')));
				assertFalse(utils.isRegExp([]));
				assertFalse(utils.isRegExp(function(){}));
				assertFalse(utils.isRegExp({}));
				assertTrue(utils.isRegExp(/test/));
				assertFalse(utils.isRegExp(true));
				assertFalse(utils.isRegExp(0));
				assertFalse(utils.isRegExp('test'));
				assertFalse(utils.isRegExp(undefined));
			},

			isBoolean: function () {
				assertFalse(utils.isBoolean(document.createElement('div')));
				assertFalse(utils.isBoolean([]));
				assertFalse(utils.isBoolean(function(){}));
				assertFalse(utils.isBoolean({}));
				assertFalse(utils.isBoolean(/test/));
				assertTrue(utils.isBoolean(true));
				assertFalse(utils.isBoolean(0));
				assertFalse(utils.isBoolean('test'));
				assertFalse(utils.isBoolean(undefined));
			},

			isNumber: function () {
				assertFalse(utils.isNumber(document.createElement('div')));
				assertFalse(utils.isNumber([]));
				assertFalse(utils.isNumber(function(){}));
				assertFalse(utils.isNumber({}));
				assertFalse(utils.isNumber(/test/));
				assertFalse(utils.isNumber(true));
				assertTrue(utils.isNumber(0));
				assertFalse(utils.isNumber(NaN));
				assertFalse(utils.isNumber(Infinity));
				assertFalse(utils.isNumber('test'));
				assertFalse(utils.isNumber(undefined));
			},

			isString: function () {
				assertFalse(utils.isString(document.createElement('div')));
				assertFalse(utils.isString([]));
				assertFalse(utils.isString(function(){}));
				assertFalse(utils.isString({}));
				assertFalse(utils.isString(/test/));
				assertFalse(utils.isString(true));
				assertFalse(utils.isString(0));
				assertTrue(utils.isString('test'));
				assertFalse(utils.isString(undefined));
			},

			isUndefined: function () {
				assertFalse(utils.isUndefined(document.createElement('div')));
				assertFalse(utils.isUndefined([]));
				assertFalse(utils.isUndefined(function(){}));
				assertFalse(utils.isUndefined({}));
				assertFalse(utils.isUndefined(/test/));
				assertFalse(utils.isUndefined(true));
				assertFalse(utils.isUndefined(0));
				assertFalse(utils.isUndefined('test'));
				assertTrue(utils.isUndefined(undefined));
			}

		});
		
	}
);