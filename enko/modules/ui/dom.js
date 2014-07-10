// dom.js



enko.inject(['utils', 'ui/widget'],
	function (utils, Widget) {
		'use strict';

		var element, hash; // to-do: move these inside the function scope

		enko.define('ui/dom', {

			create: function (type, options) { // needs testing
				element = document.createElement(type);

				if (options) {
					hash = options.attributes;

					for (var a in hash) {
						element.setAttribute(a, hash[a]);
					}

					hash = options.style;

					for (var s in hash) {
						element.style[s] = hash[s];
					}

					options.class && element.classList.add(options.class);
				}

				return element;
			},

			wrap: function (node) { // wraps the node as a widget to allow the usage of widget methods
				return new Widget(node);
			},

			stylize: function (node, styles) { // to-do: consider removing
				Widget.prototype.stylize.call({
					node: node
				}, styles);
			}

		});

	}
);