// UI.js



Root.export('UI', {

	/* structure:
		{		
			'module_1': [ // array of elements that require module_1
				element1,
				element2,
				element3
			],
			'module_2': [
				...
			],
			...
		}
	*/
	_manifestQueue: {},

	_importArray: [],

	manifest: function () { // needs testing
		var manifestQueue = this._manifestQueue,
			importArray = this._importArray,
			behavior;

		Root.walkTree(function (element) {
			behavior = element.getAttribute('behavior');

			if (behavior) {
				if (!(behavior in manifestQueue)) {
					manifestQueue[behavior] = [];
					importArray.push(behavior);
				}

				manifestQueue[behavior].push(element);
			}
		});

		Root.import(importArray,
			function () {

				var modules = [].slice.call(arguments), // arguments are in the same order as importArray
					moduleName,
					options;

				modules.forEach(function (module) {
					moduleName = importArray.shift();

					manifestQueue[moduleName].forEach(function (element) {
						options = element.getAttribute('options');

						if (options) { // needs testing
							options = JSON.parse(options);
						}

						new module(element, options);
					});

					delete manifestQueue[moduleName];
				});

			}
		);
	}

});