// root.js



// Common Functions:

Root = {};

Root.addMethods = function(obj, newMethods){
	for (var method in newMethods){
		if (obj[method] != undefined){
			throw new Error("object already contains method"); // needs testing
		}

		obj[method] = newMethods[method];
	}
}

Root.addMethods(Root, {

	namespace: function(ns){
		var parts = ns.split(".");

		window[parts[0]] = window[parts[0]] || {};

		var parent = window[parts[0]];

		for (var i = 1, len = parts.length; i < len; i++){
			if (parent[parts[i]] == undefined){
				parent[parts[i]] = {};
			}

			parent = parent[parts[i]];
		}

		return parent;
	},

	classify: function(className, properties){
		if (!className || typeof(className) != "string" || !properties || typeof(properties) != "object"){
			throw new Error("usage: Root.classify(\/*string*\/ className, \/*object*\/ properties)");
		}

		var superClass = properties.extend,
			initialize = properties.initialize, // consider putting initialize under methods
			events = properties.events,
			methods = properties.methods,
			statics = properties.statics;

		var ns = className.split("."),
			parent;

		if (ns.length > 1){
			className = ns.pop();
			ns = ns.join(".");
			parent = Root.namespace(ns);
		}
		else { // test the case where ns.length == 1
			parent = window;
		}

		parent[className] = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9){
			this.initialize(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);

			if (events && typeof(events) == "object" && this.node && this.node.handle){ // consider using a different way to find out if the class is part of the UI module
				var node = this.node;
				node.instance = this;

				for (var eventType in events){
					node.handle(eventType, events[eventType]);
				}
			}
		};

		var newClass = parent[className];
		newClass.prototype.blueprint = newClass; // consider using a different name than blueprint

		if (superClass){ // inheritance
			var newPrototype = newClass.prototype,
				superPrototype = superClass.prototype,
				superMethods = superClass._methods;

			superMethods.forEach(function(method){ // consider creating a reference to the methods object and copying that instead
				newPrototype[method] = superPrototype[method]; // inherit methods
			});

			newPrototype.callSuper = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9){
				var callerMethod = this.callSuper.caller,
					methodName = callerMethod._methodName;

				return superClass.prototype[methodName].call(this, arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8, arg9);
			};

			if (initialize){
				initialize._methodName = "initialize";
				newPrototype.initialize = initialize;
			}
			else {
				newPrototype.initialize = superPrototype.initialize;
			}

			if (methods){
				newClass._methods = superClass._methods.slice();

				for (var method in methods){
					methods[method]._methodName = method;
					newPrototype[method] = methods[method]; // add new method or overwrite existing method
					newClass._methods.push(method);
				}

				newClass._methods.removeDuplicates();
			}
			else {
				newClass._methods = superClass._methods;
			}

			superClass._statics.forEach(function(staticMember){
				newClass[staticMember] = superClass[staticMember];
			});

			if (statics){
				newClass._statics = superClass._statics.slice();

				for (var staticMember in statics){
					newClass[staticMember] = statics[staticMember];
					newClass._statics.push(staticMember);
				}

				newClass._statics.removeDuplicates();
			}
			else {
				newClass._statics = superClass._statics;
			}
		}
		else {
			newClass._methods = []; // keeping a reference to all of the methods/statics for inheritance
			newClass._statics = [];

			if (methods){
				for (var method in methods){
					methods[method]._methodName = method;
					newClass._methods.push(method);
				}

				newClass.prototype = methods;
			}

			initialize._methodName = "initialize";
			newClass.prototype.initialize = initialize;

			if (statics){
				for (var staticMember in statics){
					newClass[staticMember] = statics[staticMember]; // all instances will point to the same object for their static methods
					newClass._statics.push(staticMember);
				}
			}
		}
	},

	addLoadHandler: function(handler){ // needs testing
		if (typeof(window.onload) != "function"){
			window.onload = handler;
		}
		else {
			var original = window.onload;

			window.onload = function(){
				original();
				handler();
			}
		}
	}

});

Root.namespace("Root.UI");

Root.addMethods(Root.UI, {

	initialize: function(){ // needs testing
		var RootUI = Root.UI,
			cn, instance;

		!function instantiate(element){
			if (!element){
				return;
			}

			if ((cn = element.className) && (instance = RootUI[cn])){
				new instance(element, JSON.parse(element.getAttribute("config")));
			}
			else {
				instantiate(element.firstElementChild);
			}

			instantiate(element.nextElementSibling);
		}(document.body.firstElementChild);
	}

});

// Compatibility and Convenience Functions:

Root.addMethods(Element.prototype, {

	handle: (Element.prototype.addEventListener // W3C
		? function(eventType, callback, useCapture){ // wantsUntrusted parameter has not been standardized yet
			var callbackName = callback.name || eventType;

			if (!this._handlers){
				this._handlers = {}; // to allow the removal of event listeners later
			}

			this._handlers[callbackName] = callback;
			this.addEventListener(eventType, callback, useCapture);
		}
		: (Element.prototype.attachEvent
			? function(eventType, callback){ // IE 10 and below
				var that = this,
					callbackName = callback.name || eventType;

				if (!this._handlers){
					this._handlers = {};
				}

				this._handlers[callbackName] = function(){ // may have to pass in event parameter
					callback.call(that);
				};

				this.attachEvent("on" + eventType, this._handlers[callbackName]);
			}
			: function(eventType, callback){ // other
				var that = this;

				this["on" + eventType] = function(){ // may have to pass in event parameter
					callback.call(that);
				};
			}
		)
	),

	ignore: (Element.prototype.removeEventListener // W3C
		? function(eventType, callback, useCapture){ // wantsUntrusted parameter has not been standardized yet
			var callbackName = callback && callback.name || eventType;
			callback = callback || this._handlers[callbackName];

			this.removeEventListener(eventType, callback, useCapture);
			delete this._handlers[callbackName];
		}
		: (Element.prototype.detachEvent
			? function(eventType, callback){ // IE 10 and below
				var callbackName = callback && callback.name || eventType;

				this.detachEvent("on" + eventType, this._handlers[callbackName]);
				delete this._handlers[callbackName];
			}
			: function(eventType){ // other
				this["on" + eventType] = function(){};
			}
		)
	),

	animate: function(options){
		clearInterval(this.animation);

		if (options.begin){
			options.begin();
		}

		var start = new Date(),

			ease = options.ease,
			tick = options.tick,
			delay = options.delay || 10,
			duration = options.duration || 1000,

			that = this;
			
		this.animation = setInterval(function(){
			progress = (new Date() - start) / duration;

			if (progress > 1){
				progress = 1;
			}

			tick.call(that, ease(progress));

			if (progress == 1){
				clearInterval(that.animation);

				if (options.end){
					options.end();
				}
			}
		}, delay);
	},

	destroy: function(){
		this.parentNode.removeChild(this);
	}

});

Root.addMethods(Array.prototype, {

	contains: function(value){
		for (var i = 0, len = this.length; i < len; i++){
			if (this[i] === value){
				return true;
			}
		}

		return false;
	},

	removeDuplicates: function(){ // consider a more conventional implementation
		this.sort();

		for (var i = 0, o, p, n; i < this.length; i++){
			o = i;
			p = o + 1;
			n = 0;

			while (this[p] === this[o]){
				p++;
				n++;
			}
			
			this.splice(o + 1, n);
		}
	}

});

Root.addMethods(Node.prototype, {

	insertAfter: function(newElement, reference){
		this.insertBefore(newElement, reference.nextSibling);
	}

});

// Public Objects:

Root.Easers = {

	linear: function(progress){
		return progress;
	},

	Circle: {
		one: function(progress){ // needs testing
			return Math.sin(Math.acos(progress));
		},

		two: function(progress){
			return Math.sin(Math.acos(progress - 1));
		},

		three: function(progress){
			return 1 - Math.sin(Math.acos(progress - 1));
		},
		
		four: function(progress){
			return 1 - Math.sin(Math.acos(progress));
		}
	}

};