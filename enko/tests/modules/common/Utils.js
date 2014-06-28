// test for Utils.js



enko.inject(['Utils', 'UnitTest'],
	function (Utils, UnitTest) {
		
		var UT = new UnitTest('Utils'),

			// shortcuts
			assertTrue = UT.get('assertTrue'),
			assertFalse = UT.get('assertFalse'),
			assertEquals = UT.get('assertEquals'),
			assertSame = UT.get('assertSame');

		// tests
		UT.runTests({

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

				obj = Utils.consolidate([obj1, obj2]);

				assertSame(obj, obj1);
				assertEquals(obj, {
					key1: 'val1',
					key2: 'val2',
					key3: 'val3'
				});

				obj = Utils.consolidate([{}, obj2, obj3], true);
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

			isArray: function () {
				assertTrue(Utils.isArray([]));
				assertFalse(Utils.isArray(function(){}));
				assertFalse(Utils.isArray({}));
				assertFalse(Utils.isArray(/test/));
				assertFalse(Utils.isArray(true));
				assertFalse(Utils.isArray(0));
				assertFalse(Utils.isArray('test'));
			},

			isFunction: function () {
				assertFalse(Utils.isFunction([]));
				assertTrue(Utils.isFunction(function(){}));
				assertFalse(Utils.isFunction({}));
				assertFalse(Utils.isFunction(/test/));
				assertFalse(Utils.isFunction(true));
				assertFalse(Utils.isFunction(0));
				assertFalse(Utils.isFunction('test'));
			},

			isObject: function () {
				assertFalse(Utils.isObject([]));
				assertFalse(Utils.isObject(function(){}));
				assertTrue(Utils.isObject({}));
				assertFalse(Utils.isObject(/test/));
				assertFalse(Utils.isObject(true));
				assertFalse(Utils.isObject(0));
				assertFalse(Utils.isObject('test'));
			},

			isRegExp: function () {
				assertFalse(Utils.isRegExp([]));
				assertFalse(Utils.isRegExp(function(){}));
				assertFalse(Utils.isRegExp({}));
				assertTrue(Utils.isRegExp(/test/));
				assertFalse(Utils.isRegExp(true));
				assertFalse(Utils.isRegExp(0));
				assertFalse(Utils.isRegExp('test'));
			},

			isBoolean: function () {
				assertFalse(Utils.isBoolean([]));
				assertFalse(Utils.isBoolean(function(){}));
				assertFalse(Utils.isBoolean({}));
				assertFalse(Utils.isBoolean(/test/));
				assertTrue(Utils.isBoolean(true));
				assertFalse(Utils.isBoolean(0));
				assertFalse(Utils.isBoolean('test'));
			},

			isNumber: function () {
				assertFalse(Utils.isNumber([]));
				assertFalse(Utils.isNumber(function(){}));
				assertFalse(Utils.isNumber({}));
				assertFalse(Utils.isNumber(/test/));
				assertFalse(Utils.isNumber(true));
				assertTrue(Utils.isNumber(0));
				assertFalse(Utils.isNumber(NaN));
				assertFalse(Utils.isNumber(Infinity));
				assertFalse(Utils.isNumber('test'));
			},

			isString: function () {
				assertFalse(Utils.isString([]));
				assertFalse(Utils.isString(function(){}));
				assertFalse(Utils.isString({}));
				assertFalse(Utils.isString(/test/));
				assertFalse(Utils.isString(true));
				assertFalse(Utils.isString(0));
				assertTrue(Utils.isString('test'));
			}

		});
		
	}
);