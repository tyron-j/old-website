// Root.js

// TO-DO: implement Root.Debug

Root = {

	consolidate: function (obj1, obj2, overwrite) { // merge two objects with the option to overwrite obj1 properties with obj2 properties
		if (overwrite) {
			for (var key in obj2) {
				obj1[key] = obj2[key];
			}
		} else {
			for (var key in obj2) {
				if (!(key in obj1)) {
					obj1[key] = obj2[key];
				}
			}
		}
	},

	_path: (function () { // this needs to be here
		var scripts = document.getElementsByTagName('script'),
			path;

		[].some.call(scripts, function (script) {
			if (/root\.js$/i.test(script.getAttribute('src'))) {
				path = script.getAttribute('src');
				return true;
			}
		});

		return path;
	})()

};

// components:

Root.consolidate(Root, {

	// utilities:
	
	namespace: function (ns) {
		var parts = ns.split('.'),
			parent;

		window[parts[0]] = window[parts[0]] || {};
		
		parent = window[parts.shift()];

		parts.forEach(function (part) { // consider using a while loop with shift
			if (parent[part] === undefined) {
				parent[part] = {};
				parent[part]._namespaced = true;
			}

			parent = parent[part];
		});

		return parent;
	},

	exists: function (property) {
		var levels = property.split('.'),
			parent = window;

		return !levels.some(function (level) {
			if (parent[level] === undefined) {
				return true;
			} else {
				parent = parent[level];
				return false;
			}
		});
	},

	organize: function (arr) { // sort and remove duplicates
		arr.sort();

		for (var i = 0, l = arr.length, o, p, n; i < l; i++) {
			o = i; // original
			p = o + 1; // pointer
			n = 0; // number of duplicates

			while (arr[p] === arr[o]) {
				p++;
				n++;
			}

			arr.splice(o + 1, n);
		}
	},

	walkTree: function (root, callback) { // needs testing
		if (!callback) { // root parameter is optional
			callback = root;
			root = document.body;
		}

		callback(root);
		
		[].forEach.call(root.children, function (child) {
			Root.walkTree(child, callback);
		});
	},

	// type checkers:

	_toString: function (obj) {
		return Object.prototype.toString.call(obj);
	},

	isArray: function (unknown) {
		return this._toString(unknown) === '[object Array]';
	},

	isFunction: function (unknown) {
		return this._toString(unknown) === '[object Function]';
	},

	isObject: function (unknown) {
		return this._toString(unknown) === '[object Object]';
	},

	isRegExp: function (unknown) {
		return this._toString(unknown) === '[object RegExp]';
	},

	isBoolean: function (unknown) {
		return typeof unknown === 'boolean';
	},

	isNumber: function (unknown) {
		return typeof unknown === 'number' && unknown.toString() !== 'NaN';
	},

	isString: function (unknown) {
		return typeof unknown === 'string';
	},

	// core functions:

	/* usage:
		var SomeClass = Root.classify({
			// specifications
		});

		Root.export('Root.SomeClass', SomeClass); // export SomeClass as Root.SomeClass
	*/
	classify: function (options) {
		var newClass = options.initialize,
			superClass = options.extend,
			methods = options.methods,
			statics = options.statics;

		if (superClass) {
			if (!newClass) {
				newClass = function () {
					superClass.apply(this, arguments);
				}
			}

			var newPrototype = newClass.prototype,
				superPrototype = superClass.prototype;

			for (var prop in superPrototype) {
				newPrototype[prop] = superPrototype[prop] // inherit properties
			}

			/* usage:
				this.callSuper('initialize', [arg1, arg2, arg3]);
			*/
			if (!newPrototype.callSuper) {
				newPrototype.callSuper = function (methodName, args) { // consider changing this to Root._callSuper
					return superPrototype[methodName].apply(this, args);
				}
			}

			if (methods) {
				for (var method in methods) {
					newPrototype[method] = methods[method]; // add new method or overwrite inherited method
				}
			}

			superClass._statics.forEach(function (staticMember) {
				newClass[staticMember] = superClass[staticMember];
			});

			if (statics) {
				newClass._statics = superClass._statics.slice();
			} else {
				newClass._statics = superClass._statics;
			}
		} else { // if no superClass
			if (!newClass) {
				throw new Error('initialize is required');
			}

			if (methods) {
				newClass.prototype = methods;
			}

			newClass._statics = [];
		}

		newClass.prototype.initialize = newClass;
		
		if (statics) {
			for (var staticMember in statics) {
				newClass[staticMember] = statics[staticMember];
				newClass._statics.push(staticMember);
			}

			this.organize(newClass._statics);
		}

		return newClass;
	},

	/* structure:
		{
			'module_1': [ // array of module objects that require module_1
				moduleLoader1, // each loader includes an array and has an 'update' callback for when a required module is exported
				moduleLoader2,
				moduleLoader3
			],
			'module_2': [
				...
			],
			...
		}
	*/
	_importQueue: {}, // queue for pending imports

	_imported: {}, // imported modules

	_modulesPath: Root._path.replace(Root._path.match(/root\.js/i)[0], 'modules/'),

	_mainPath: 'main.js', // may change this later

	appendScript: function (url) {
		var script = document.createElement('script');

		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		script.setAttribute('async', '');

		document.head.appendChild(script);
	},

	/* usage:
		Root.import(['module_1', 'module_2', 'module_3'],
			function (module_1, module_2, module_3) {
				// use imported modules
			}
		);
	*/
	import: function (modules, callback) { // needs testing
		var moduleLoader = new ModuleLoader(modules.length, callback),

			// shortcuts
			namespace = this.namespace,
			exists = this.exists,
			importQueue = this._importQueue,
			appendScript = this.appendScript,
			modulesPath = this._modulesPath,

			original;

		modules.forEach(function (module) { // modules are passed in as strings
			original = module;
			module = 'Root._imported.' + module;
			
			moduleLoader.append(original); // add the string for now, replace the string with the actual object later

			if (exists(module) && !namespace(module)._namespaced) {
				moduleLoader.update(original, namespace(module)); // abusing the namespace function
			} else {
				if (!(original in importQueue)) {
					importQueue[original] = [];
					appendScript(modulesPath + original.split('.').join('/') + '.js');
				}

				importQueue[original].push(moduleLoader);
			}
		});
	},

	export: function (module, moduleObj) {
		var original = module, // preserve full module name
			module = 'Root._imported.' + module,
			parent = module.split('.');

		if (this.exists(module)) { // already checked if it was namespaced in Root.import
			this.consolidate(moduleObj, this.namespace(module));
			delete moduleObj._namespaced;
		}

		module = parent.pop();
		parent = this.namespace(parent.join('.'));
		parent[module] = moduleObj;

		this._importQueue[original].forEach(function (moduleLoader) {
			moduleLoader.update(original, moduleObj);
		});

		delete this._importQueue[original];
	}

});

// classes:

var ModuleLoader = Root.classify({

	initialize: function (total, callback) {
		this.completed = 0;
		this.total = total;
		this.callback = callback;
		this.moduleArray = [];
	},

	methods: {
		append: function (module) {
			this.moduleArray.push(module);
		},
		update: function (module, moduleObj) { // this will be called in the Root.export function
			this.moduleArray[this.moduleArray.indexOf(module)] = moduleObj; // replacing string with actual object
			this.completed++;

			if (this.completed === this.total) {
				this.callback.apply(this.callback, this.moduleArray); // what would be the ideal context?
			}
		}
	}

});

/*
(function () {

	Root.appendScript(Root._mainPath);

})();
*/