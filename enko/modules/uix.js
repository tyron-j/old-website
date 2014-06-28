// uix.js



enko.inject(['utils'],
	function (utils) {

		enko.define('uix', {

			manifest: function () {
				var manifestQueue = {},
					injectArray = [],
					behavior;

				utils.walkTree(function (element) {
					behavior = element.getAttribute('enko-behavior');

					if (behavior) {
						behavior = 'uix/behaviors/' + behavior; // consider applying this method
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
								options = element.getAttribute('enko-options');

								if (options) { // needs testing
									options = JSON.parse(options);
								}

								style = moduleName.split('/');
								style = style[style.length - 1];

								element.classList.add(style);

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