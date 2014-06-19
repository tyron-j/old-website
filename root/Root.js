// Root.js



(function () {

	// setup:

	var rootPath, config, common, debug;

	(function (scripts) {
		[].some.call(scripts, function (script) {
			if (/root\.js$/i.test(script.getAttribute('src'))) {
				rootPath = script.getAttribute('src');
				return true;
			}
		});
	})(document.getElementsByTagName('script'));

	// configuration:

	config = new XMLHttpRequest();

	config.addEventListener('readystatechange', function () {
		if (config.readyState === 4) {
			if ((config.status >= 200 && config.status < 300) || config.status === 304) {
				config = JSON.parse(config.responseText);
			}
		}
	});

	config.open('GET', rootPath.replace(/root\.js$/i, 'config.json'), false);
	config.send();

	common = config.common;
	debug = config.debug;

	// utilities:

	function appendScript (url) {
		var script = document.createElement('script');

		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		script.setAttribute('async', '');

		// consider adding a 'load' event listener here if modifying the implementation of Root.export
		document.head.appendChild(script);
	}

	function organize (arr) { // sort and remove duplicates in an array
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
	}

	// Root:

	var importQueue, exported, modulesPath, commonPath;

	/* structure:
		{
			'module1': [ // array of module loaders that require module1
				moduleLoader1, // each module loader includes an array and has an 'update' callback for when a required module is exported
				moduleLoader2,
				moduleLoader3
			],
			'module2': [
				...
			],
			...
		}
	*/
	importQueue = {}; // queue for pending imports
	exported = {}; // hash for exported modules
	modulesPath = rootPath.replace(/root\.js$/i, 'modules/');
	commonPath = modulesPath + 'common/';

	Root = Object.freeze({

		/* usage:
			var SomeClass = Root.classify({
				// specifications
			});

			Root.export('SomeClass', SomeClass);
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
			
			if (statics) {
				for (var staticMember in statics) {
					newClass[staticMember] = statics[staticMember];
					newClass._statics.push(staticMember);
				}

				organize(newClass._statics);
			}

			return newClass;
		},

		/* usage:
			Root.import(['module_1', 'module_2', 'module_3'],
				function (module_1, module_2, module_3) {
					// use imported modules
				}
			);
		*/
		import: function (modules, callback) {
			var moduleLoader = new ModuleLoader(modules.length, callback);

			modules.forEach(function (module) { // modules are passed in as strings
				moduleLoader.append(module); // add the string for now, replace the string with the actual object later

				if (module in exported) {
					moduleLoader.update(module, exported[module]);
				} else {
					if (!(module in importQueue)) {
						importQueue[module] = [];
						if (module in common) { // needs testing
							appendScript(commonPath + module + '.js');
						} else {
							appendScript(modulesPath + module + '.js');
						}
					}

					importQueue[module].push(moduleLoader);
				}
			});
		},

		export: function (module, moduleObj) {
			exported[module] = moduleObj;

			importQueue[module].forEach(function (moduleLoader) {
				moduleLoader.update(module, moduleObj);
			});

			delete importQueue[module];
		}
		
	});

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
					this.callback.apply(this.callback, this.moduleArray); // to-do: figure out the ideal context
				}
			}

		}

	});

})();