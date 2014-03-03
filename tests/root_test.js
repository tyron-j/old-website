// root_test.js



(function(){
	Root.classify("Root.UI.TestClass", {
		initialize: function(testString0, testString1, testString2){
			this.testString0 = testString0;
			this.testString1 = testString1;
			this.testString2 = testString2;
			// this.privateMember = testPrivate;
			this.node = document.createElement("div");
			this.node.instance = this;
			this.node.style.cssText = "position: absolute; width: 100px; height: 100px; background-color: orange";
			document.body.appendChild(this.node);
		},
		events: {
			click: function(){ // could number the same type of event handlers to keep a reference to each handler (ex. click0, click1, ...)
				alert("calling the click handler: " + this.instance.testValue);
				this.ignore("mouseover"); // don't need to specify second parameter
			},
			mouseover: function(){
				console.log("testing mouseover");
			}
		},
		methods: {
			method0: function(){
				// console.log("calling method0"); // remove later
				// console.log("this.testString0: " + this.testString0); // remove later
				return ("calling method0: " + this.testString0);
			},
			method1: function(){
				return ("calling method1: " + this.testString1);
			},
			method2: function(){
				return ("calling method2: " + this.testString2);
			},
			setValue: function(value){
				this.testValue = value;
				return this.testValue;
			}
		},
		statics: {
			staticValue: "staticValue",
			staticMethod: function(){
				return ("calling staticMethod");
			},
			modify: function(object, propertyName){
				object[propertyName] = "modified";
				return object[propertyName];
			}
		},
		privates: {
			testPrivate: "calling private member"
		}
	});
	
	var testInstance = new Root.UI.TestClass("test0", "test1", "test2");
	var obj = { x: "original" };
	
	Root.classify("Root.UI.ChildClass", {
		extend: Root.UI.TestClass,
		initialize: function(childString0, childString1, childString2){
			this.callSuper(childString0, childString1, childString2);
			document.body.removeChild(this.node);
		},
		methods: {
			setValue: function(value){
				return this.callSuper(value);
			}
		}
	});
	
	var childInstance = new Root.UI.ChildClass("child0", "child1", "child2");
	
	var tests = [
		testInstance.method0() === "calling method0: test0",
		testInstance.method1() === "calling method1: test1",
		testInstance.method2() === "calling method2: test2",
		testInstance.method0() === "calling method0: test0",
		testInstance.testValue === undefined,
		testInstance.setValue("removing the mouseover handler") === "removing the mouseover handler",
		Root.UI.TestClass.staticValue === "staticValue",
		Root.UI.TestClass.staticMethod() === "calling staticMethod",
		obj.x === "original",
		Root.UI.TestClass.modify(obj, "x") === "modified",
		childInstance.method0() === "calling method0: child0",
		childInstance.method1() === "calling method1: child1",
		childInstance.method2() === "calling method2: child2",
		childInstance.method0() === "calling method0: child0",
		childInstance.testValue === undefined,
		childInstance.setValue("testing childInstance") === "testing childInstance",
		Root.UI.ChildClass.staticValue === "staticValue",
		Root.UI.ChildClass.staticMethod() === "calling staticMethod",
		(obj.x = "original"),
		Root.UI.ChildClass.modify(obj, "x") === "modified"
	];
	
	for (var i = 0, len = tests.length; i < len; i++){
		if (!tests[i]){
			console.error("WARNING: test " + i + " failed");
			break;
		}
		if (i == len - 1){
			console.log("tests successfully passed");
		}
	}
})();