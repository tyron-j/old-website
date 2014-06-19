// UI.js



Root.import(['Utils'],
	function (Utils) {

		Root.export('UI', {

			manifest: function () {
				var manifestQueue = {},
					importArray = [],
					behavior;

				Utils.walkTree(function (element) {
					behavior = element.getAttribute('behavior');

					if (behavior) {
						// behavior = 'UI/' + behavior; // consider applying this method
						if (!(behavior in manifestQueue)) {
							manifestQueue[behavior] = [];
							importArray.push(behavior);
						}

						manifestQueue[behavior].push(element);
					}
				});

				Root.import(importArray,
					function () {

						var modules = [].slice.call(arguments),
							moduleName,
							options;

						modules.forEach(function (module) {
							moduleName = importArray.shift();

							manifestQueue[moduleName].forEach(function (element) {
								options = element.getAttribute('options');

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