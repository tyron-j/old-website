// enko.js



(function () {
	'use strict';

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

	function appendScript(url) {
		var script = document.createElement('script');

		script.setAttribute('type', 'text/javascript');
		script.setAttribute('src', url);
		script.setAttribute('async', '');

		// consider adding a 'load' event listener here if modifying the implementation of enko.define
		document.head.appendChild(script);
	}

	function organize(arr) { // sort and remove duplicates in an array
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

	var extending, dependents, defined, modulesPath, commonPath;

	extending = false; // flag for extending a class

	/* structure:
		{
			'module1': [ // array of injectors that require module1
				injector1, // each injector includes an array and has an 'update' callback for when a required module is defined
				injector2,
				injector3
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

	window.enko = Object.freeze({

		/* usage:
			var SomeClass = enko.classify({
				// specifications
			});

			enko.define('someclass', SomeClass);
		*/
		classify: function (options) {
			var SuperClass = options.extend,
				initialize = options.initialize || SuperClass,
				methods = options.methods,
				statics = options.statics,

				NewClass;

			if (!initialize) {
				throw "[enko] initialize is required"; // needs testing
			}

			NewClass = function () {
				if (!extending) {
					initialize.apply(this, arguments);
				}
			}

			if (SuperClass) {
				var superPrototype = SuperClass.prototype,
					newPrototype;

				extending = true;
				newPrototype = NewClass.prototype = new SuperClass();
				extending = false;

				if (methods) {
					for (var method in methods) {
						newPrototype[method] = methods[method]; // add new method or overwrite inherited method
					}
				}

				SuperClass.statics.forEach(function (staticMember) {
					NewClass[staticMember] = SuperClass[staticMember];
				});

				if (statics) {
					NewClass.statics = SuperClass.statics.slice();
				} else {
					NewClass.statics = SuperClass.statics;
				}
			} else { // if no SuperClass
				if (methods) {
					NewClass.prototype = methods;
				}

				NewClass.statics = [];
			}
			
			NewClass.prototype.constructor = NewClass; // set the constructor to what it should be
			
			if (statics) {
				for (var staticMember in statics) {
					NewClass[staticMember] = statics[staticMember];
					NewClass.statics.push(staticMember);
				}

				organize(NewClass.statics);
			}

			return NewClass;
		},

		/* usage:
			enko.inject(['module1', 'module2', 'module3'],
				function (module1, module2, module3) {
					// use injected modules
				}
			);
		*/
		inject: function (modules, callback) {
			var injector = new Injector(modules.length, callback);

			modules.forEach(function (module) { // modules are passed in as strings
				injector.append(module); // add the string for now, replace the string with the actual object later

				if (module in defined) {
					injector.update(module, defined[module]);
				} else {
					if (!(module in dependents)) {
						dependents[module] = [];
						
						if (module in common) { // needs testing
							appendScript(commonPath + module + '.js');
						} else {
							appendScript(modulesPath + module + '.js');
						}
					}

					dependents[module].push(injector);
				}
			});
		},

		define: function (module, moduleObj) {
			defined[module] = moduleObj;

			dependents[module].forEach(function (injector) {
				injector.update(module, moduleObj);
			});

			delete dependents[module];
		}
		
	});

	var Injector = enko.classify({

		initialize: function (total, callback) {
			this.completed = 0;
			this.total = total;
			this.callback = callback;
			this.dependencies = [];
		},

		methods: {

			append: function (module) {
				this.dependencies.push(module);
			},

			update: function (module, moduleObj) {
				this.dependencies[this.dependencies.indexOf(module)] = moduleObj; // replacing string with actual object
				this.completed++;

				if (this.completed === this.total) {
					this.callback.apply(this.callback, this.dependencies); // to-do: figure out the ideal context
				}
			}

		}

	});

	// debug:

	if (debug) {
		setTimeout(function () {
			if (Object.keys(dependents).length) {
				var errorMsg = "[enko] the following modules have not been defined:\n";

				for (var module in dependents) {
					errorMsg += "\n" + module;
				}

				console.error(errorMsg);
			}
		}, 500);
	}

})();