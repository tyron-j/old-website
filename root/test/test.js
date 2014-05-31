// test.js



Root.import(['Root.UnitTest'],
	function (UnitTest) {
		
		// shortcuts
		var UT = new UnitTest(),

			assertTrue = UT.get('assertTrue'),
			assertFalse = UT.get('assertFalse'),
			assertEquals = UT.get('assertEquals'),
			assertSame = UT.get('assertSame');

		UT.runTests({

			classify: function () {
				var TestClass = Root.classify({
					
					initialize: function (testStr0, testStr1, testStr2) {
						this.testStr0 = testStr0;
						this.testStr1 = testStr1;
						this.testStr2 = testStr2;
					},

					methods: {
						method0: function () {
							return ("calling method0: " + this.testStr0);
						},
						method1: function () {
							return ("calling method1: " + this.testStr1);
						},
						method2: function () {
							return ("calling method2: " + this.testStr2);
						},
						setValue: function (val) {
							this.testValue = val;
							return this.testValue;
						}
					},

					statics: {
						staticValue: 'staticValue',
						staticMethod: function () {
							return ('calling staticMethod');
						},
						modify: function (obj, prop) {
							obj[prop] = 'modified';
							return obj[prop];
						}
					}

				});

				var testInstance = new TestClass('test0', 'test1', 'test2'),
					obj = { x: 'original' };

				var ChildClass = Root.classify({

					extend: TestClass,

					initialize: function (childStr0, childStr1, childStr2) {
						this.callSuper('initialize', [childStr0, childStr1, childStr2]);
					},

					methods: {
						setValue: function (val) {
							return this.callSuper('setValue', [val]);
						}
					}

				});

				var childInstance = new ChildClass('child0', 'child1', 'child2');

				assertSame(testInstance.method0(), "calling method0: test0");
				assertSame(testInstance.method1(), "calling method1: test1");
				assertSame(testInstance.method2(), "calling method2: test2");
				assertSame(testInstance.method0(), "calling method0: test0");
				assertSame(testInstance.testValue, undefined);
				assertSame(TestClass.staticValue, "staticValue");
				assertSame(TestClass.staticMethod(), "calling staticMethod");
				assertSame(obj.x, "original");
				assertSame(TestClass.modify(obj, "x"), "modified");
				assertSame(childInstance.method0(), "calling method0: child0");
				assertSame(childInstance.method1(), "calling method1: child1");
				assertSame(childInstance.method2(), "calling method2: child2");
				assertSame(childInstance.method0(), "calling method0: child0");
				assertSame(childInstance.testValue, undefined);
				assertSame(childInstance.setValue("testing childInstance"), "testing childInstance");
				assertSame(ChildClass.staticValue, "staticValue");
				assertSame(ChildClass.staticMethod(), "calling staticMethod");

				obj.x = "original";

				assertSame(ChildClass.modify(obj, "x"), "modified");
			},

			import: function () { // change this into unit test format
				Root.import(['Root.Test.Outer1'],
					function (Outer1) {
						Outer1.outer1method();
						console.info("import successful");
					}
				);
			}

		});

	}
);