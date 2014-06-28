// test for utils.js



enko.inject(['utils', 'unittest'],
	function (utils, UnitTest) {
		
		var ut = new UnitTest('utils'),

			// shortcuts
			assertTrue = ut.get('assertTrue'),
			assertFalse = ut.get('assertFalse'),
			assertEquals = ut.get('assertEquals'),
			assertSame = ut.get('assertSame');

		// tests
		ut.runTests({

			consolidate: function () {
				var obj1 = {
						key1: 'val1'
					},
					obj2 = {
						key1: '_val1',
						key2: 'val2',
						key3: 'val3'
					},
					obj3 = {
						key1: 'val1',
						key2: '_val2',
						key4: [1, 2, 3, {
							key1: 'val1'
						}]
					},
					obj,
					objStr;

				obj = utils.consolidate([obj1, obj2]);

				assertSame(obj, obj1);
				assertEquals(obj, {
					key1: 'val1',
					key2: 'val2',
					key3: 'val3'
				});

				obj = utils.consolidate([{}, obj2, obj3], true);
				objStr = JSON.stringify(obj2);

				assertEquals(obj, {
					key1: 'val1',
					key2: '_val2',
					key3: 'val3',
					key4: [1, 2, 3, {
						key1: 'val1'
					}]
				});
				assertSame(objStr, JSON.stringify(obj2));
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
			}

		});
		
	}
);