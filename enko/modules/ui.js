// ui.js



enko.inject(['utils'],
	function (utils) {

		enko.define('ui', {

			manifest: function () {
				var manifestQueue = {},
					injectArray = [],
					widget;

				utils.walkTree(function (element) {
					widget = element.getAttribute('ek-widget');

					element.removeAttribute('ek-widget'); // for readability; consider removing

					if (widget) {
						widget = 'ui/widgets/' + widget; // consider applying this method
						if (!(widget in manifestQueue)) {
							manifestQueue[widget] = [];
							injectArray.push(widget);
						}

						manifestQueue[widget].push(element);
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

								element.removeAttribute('ek-options'); // for readability; consider removing

								if (options) { // needs testing
									options = JSON.parse(options);
								}

								new module(element, options || {});
							});

							delete manifestQueue[moduleName];
						});

					}
				);
			}

		});

	}
);