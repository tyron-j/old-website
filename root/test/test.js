// new test.js



!function () {
	
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

	// beginning of tests

	var tests = [
		testInstance.method0() === "calling method0: test0",
		testInstance.method1() === "calling method1: test1",
		testInstance.method2() === "calling method2: test2",
		testInstance.method0() === "calling method0: test0",
		testInstance.testValue === undefined,
		TestClass.staticValue === "staticValue",
		TestClass.staticMethod() === "calling staticMethod",
		obj.x === "original",
		TestClass.modify(obj, "x") === "modified",
		childInstance.method0() === "calling method0: child0",
		childInstance.method1() === "calling method1: child1",
		childInstance.method2() === "calling method2: child2",
		childInstance.method0() === "calling method0: child0",
		childInstance.testValue === undefined,
		childInstance.setValue("testing childInstance") === "testing childInstance",
		ChildClass.staticValue === "staticValue",
		ChildClass.staticMethod() === "calling staticMethod",
		(obj.x = "original"),
		ChildClass.modify(obj, "x") === "modified"
	]

	// run classification tests

	for (var i = 0, l = tests.length; i < l; i++){
		if (!tests[i]){
			console.error("WARNING: test " + i + " failed");
			break;
		}
		if (i === l - 1){
			console.info("tests successful"); // consider putting this after the for loop
		}
	}

	// run import/export test

	Root.import(['Root.Test.Outer1'], // need to test nested and multiple imports
		function (Outer1) {
			Outer1.outer1method();
			console.info("import successful");
		}
	);

}();