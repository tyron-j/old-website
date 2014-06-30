// ux.js



enko.inject(['utils'],
	function (utils) {

		enko.define('ux', {

			manifest: function () {
				var manifestQueue = {},
					injectArray = [],
					behavior;

				utils.walkTree(function (element) {
					behavior = element.getAttribute('ek-behavior');

					if (behavior) {
						behavior = 'ux/behaviors/' + behavior; // consider applying this method
						if (!(behavior in manifestQueue)) {
							manifestQueue[behavior] = [];
							injectArray.push(behavior);
						}

						manifestQueue[behavior].push(element);
					}
				});

				enko.inject(injectArray,
					function () {

						var modules = [].slice.call(arguments),
							moduleName,
							options;

						modules.forEach(function (module) {
							moduleName = injectArray.shift();

							manifestQueue[moduleName].forEach(function (element) {
								options = element.getAttribute('ek-options');

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

	}
);