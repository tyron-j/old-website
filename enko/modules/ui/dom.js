// dom.js



enko.inject(['utils', 'ui/widget'],
	function (utils, Widget) {

		enko.define('ui/dom', {

			create: function (type) {
				return document.createElement(type);
			},

			wrap: function (node) { // wraps the node as a widget to allow the usage of widget methods
				return new Widget(node);
			},

			stylize: function (node, styles) {
				Widget.prototype.stylize.call({
					node: node
				}, styles);
			}

		});

	}
);