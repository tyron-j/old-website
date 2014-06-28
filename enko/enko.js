// enko.js



(function () {

	// setup:

	var enkoPath, config, common, debug;

	(function (scripts) {
		[].some.call(scripts, function (script) {
			enkoPath = script.getAttribute('src');

			if (/enko\.js$/i.test(enkoPath)) {
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

	config.open('GET', enkoPath.replace(/enko\.js$/i, 'config.json'), false);
	config.send();

	common = config.common;
	debug = config.debug;

	// utilities:

	function appendScript (url) {
		var script = document.createElement('script');

		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		script.setAttribute('async', '');

		// consider adding a 'load' event listener here if modifying the implementation of enko.define
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

	// enko:

	var dependents, defined, modulesPath, commonPath;

	/* structure:
		{
			'module1': [ // array of injectors that require module1
				moduleLoader1, // each injector includes an array and has an 'update' callback for when a required module is defined
				moduleLoader2,
				moduleLoader3
			],
			'module2': [
				...
			],
			...
		}
	*/
	dependents = {}; // hash for dependents categorized by their dependencies
	defined = {}; // hash for defined modules
	modulesPath = enkoPath.replace(/enko\.js$/i, 'modules/');
	commonPath = modulesPath + 'common/';

	enko = Object.freeze({

		/* usage:
			var SomeClass = enko.classify({
				// specifications
			});

			enko.define('SomeClass', SomeClass);
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
			enko.inject(['module_1', 'module_2', 'module_3'],
				function (module_1, module_2, module_3) {
					// use injected modules
				}
			);
		*/
		inject: function (modules, callback) {
			var moduleLoader = new Injector(modules.length, callback);

			modules.forEach(function (module) { // modules are passed in as strings
				moduleLoader.append(module); // add the string for now, replace the string with the actual object later

				if (module in defined) {
					moduleLoader.update(module, defined[module]);
				} else {
					if (!(module in dependents)) {
						dependents[module] = [];
						
						if (module in common) { // needs testing
							appendScript(commonPath + module + '.js');
						} else {
							appendScript(modulesPath + module + '.js');
						}
					}

					dependents[module].push(moduleLoader);
				}
			});
		},

		define: function (module, moduleObj) {
			defined[module] = moduleObj;

			dependents[module].forEach(function (moduleLoader) {
				moduleLoader.update(module, moduleObj);
			});

			delete dependents[module];
		}
		
	});

	var Injector = enko.classify({

		initialize: function (total, callback) {
			this.completed = 0;
			this.total = total;
			this.callback = callback;
			this.moduleArr = [];
		},

		methods: {

			append: function (module) {
				this.moduleArr.push(module);
			},

			update: function (module, moduleObj) {
				this.moduleArr[this.moduleArr.indexOf(module)] = moduleObj; // replacing string with actual object
				this.completed++;

				if (this.completed === this.total) {
					this.callback.apply(this.callback, this.moduleArr); // to-do: figure out the ideal context
				}
			}

		}

	});

})();